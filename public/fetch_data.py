import requests
import json
import time
from datetime import datetime, timedelta

# --- 설정 (이 부분을 변경하며 3회 실행) ---
SYMBOL = 'BTCUSDT'
LIMIT = 1000  # 한 번의 API 호출로 가져올 최대 캔들 수 (Binance 최대치)

# 1. 1분봉: 6개월치 데이터 (현재 날짜 기준)
# INTERVAL = '1m'
# START_DATE_STR = (datetime.now() - timedelta(days=6*30)).strftime('%Y-%m-%d %H:%M:%S')

# 2. 15분봉: 1년치 데이터 (현재 날짜 기준)
# INTERVAL = '15m'
# START_DATE_STR = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d %H:%M:%S')

# 3. 1일봉: 10년치 데이터 (2015년 1월 1일 경부터 시작)
INTERVAL = '1m' # 이 부분을 현재 실행할 시간봉으로 설정
START_DATE_STR = (datetime.now() - timedelta(days=6*30)).strftime('%Y-%m-%d %H:%M:%S') # 이 부분을 현재 실행할 시작일로 설정


# ----------------------------------------
BASE_URL = "https://api.binance.com/api/v3/klines"

# 밀리초(ms) 단위 타임스탬프로 변환
start_timestamp = int(datetime.strptime(START_DATE_STR, '%Y-%m-%d %H:%M:%S').timestamp() * 1000)

all_candles = []
current_start_time = start_timestamp

print(f"--- [{INTERVAL} 데이터 수집 시작] ---")
print(f"시작 시간: {START_DATE_STR}")

while True:
    params = {
        'symbol': SYMBOL,
        'interval': INTERVAL,
        'limit': LIMIT,
        'startTime': current_start_time
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()  # HTTP 오류 발생 시 예외 발생
        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"API 요청 중 오류 발생: {e}")
        time.sleep(5)  # 오류 발생 시 잠시 대기 후 재시도
        continue

    if not data or len(data) < 2:
        print("더 이상 데이터가 없거나 수집 완료.")
        break

    # 마지막 캔들은 다음 요청에서 시작 시간이 되므로 제외 (중복 방지)
    # 캔들 1개당 [Open time, Open, High, Low, Close, Volume, Close time, ...]
    candles_to_add = data[:-1]
    all_candles.extend(candles_to_add)

    # 다음 시작 시간은 마지막 캔들의 'Close Time' + 1ms
    current_start_time = data[-1][6] + 1
    
    # 진행 상황 출력
    last_candle_time = datetime.fromtimestamp(data[-1][0] / 1000).strftime('%Y-%m-%d %H:%M:%S')
    print(f"현재까지 {len(all_candles)}개 캔들 수집. 마지막 시간: {last_candle_time}")

    # 바이낸스 API 제한 (Rate Limit)을 준수하기 위해 대기
    time.sleep(0.5)
    
    # 캔들 수가 일정 이상 많아지면 종료 (예: 1분봉 수집 제한)
    # if INTERVAL == '1m' and len(all_candles) > 300000: break 


# --- 최종 데이터를 JSON 파일로 저장 ---
file_name = f"{INTERVAL}_candles.json"

# Lightweight Charts에 적합한 형식으로 가공
# time: 초 단위 유닉스 타임스탬프
# open/high/low/close/volume: 실수형 가격/거래량
formatted_data = []
for c in all_candles:
    formatted_data.append({
        'time': int(c[0] / 1000), 
        'open': float(c[1]),
        'high': float(c[2]),
        'low': float(c[3]),
        'close': float(c[4]),
        'volume': float(c[5])
    })
    
# JSON 파일로 저장
with open(file_name, 'w') as f:
    json.dump(formatted_data, f)
    
print(f"\n✅ 데이터 수집 완료. 총 {len(formatted_data)}개 캔들을 {file_name}로 저장했습니다.")