import requests
import json
import time
from datetime import datetime, timedelta
import os
import math

# --- 설정 (이 부분을 변경하며 3회 실행) ---
# 청크 분리 설정
CHUNK_CONFIG = {
    '1m': 12,
    '5m': 5,
    '15m': 3,
    '30m': 2,
    '1h': 1,
    '4h': 1
}

SYMBOL = 'BTCUSDT'
LIMIT = 1000  # 한 번의 API 호출로 가져올 최대 캔들 수 (Binance 최대치)

# 현재 실행할 시간봉 설정
INTERVAL = '4h' 
START_DATE_STR = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d %H:%M:%S')

# 2. 5분봉: 3개월치 데이터 (현재 날짜 기준)
# INTERVAL = '5m'
# START_DATE_STR = (datetime.now() - timedelta(days=3*30)).strftime('%Y-%m-%d %H:%M:%S')
# ----------------------------------------
BASE_URL = 'https://api.binance.com'
LIMIT = 1000  # 한번 요청에 가져올 데이터 수 (최대 1000)

def get_start_time(date_str):
    dt = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
    return int(dt.timestamp() * 1000)

def fetch_candles(symbol, interval, start_time):
    url = f"{BASE_URL}/api/v3/klines"
    params = {
        'symbol': symbol,
        'interval': interval,
        'startTime': start_time,
        'limit': LIMIT
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return []

# --- 데이터 수집 시작 ---
print(f"--- [{INTERVAL} 데이터 수집 시작] ---")
print(f"시작 시간: {START_DATE_STR}")

all_candles = []
current_start_time = get_start_time(START_DATE_STR)

while True:
    candles = fetch_candles(SYMBOL, INTERVAL, current_start_time)
    
    if not candles:
        break
        
    all_candles.extend(candles)
    print(f"현재까지 {len(all_candles)}개 캔들 수집. 마지막 시간: {datetime.fromtimestamp(candles[-1][0]/1000)}")
    
    # 다음 요청을 위한 시작 시간 갱신 (마지막 캔들 시간 + 1ms)
    current_start_time = candles[-1][0] + 1
    
    # 최신 데이터까지 왔으면 종료 (현재 시간과 비교)
    if current_start_time > time.time() * 1000:
        break
        
    # API 제한 고려 (잠시 대기)
    time.sleep(0.1)


# --- 최종 데이터를 JSON 파일로 저장 (Custom Chunking) ---

# public/data 디렉토리 확인
output_dir = "public/data"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# 데이터 가공
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

# 청크로 나누기
num_chunks = CHUNK_CONFIG.get(INTERVAL, 1)
total_len = len(formatted_data)
chunk_size = math.ceil(total_len / num_chunks)

saved_files = []

print(f"\n총 {total_len}개 캔들을 {num_chunks}개의 청크로 분할 저장합니다.")

for i in range(num_chunks):
    start_idx = i * chunk_size
    end_idx = min((i + 1) * chunk_size, total_len)
    
    chunk = formatted_data[start_idx:end_idx]
    
    if not chunk:
        continue
        
    file_name = f"{INTERVAL}_{i+1}.json"
    file_path = os.path.join(output_dir, file_name)
    
    with open(file_path, 'w') as f:
        json.dump(chunk, f)
        
    saved_files.append(file_name)
    print(f"Saved chunk {i+1}/{num_chunks}: {len(chunk)} candles to {file_name}")

# 메타데이터 업데이트
metadata_path = os.path.join(output_dir, "metadata.json")
metadata = {}
if os.path.exists(metadata_path):
    with open(metadata_path, 'r') as f:
        try:
            metadata = json.load(f)
        except:
            pass

metadata[INTERVAL] = {
    "chunks": num_chunks,
    "files": saved_files
}

with open(metadata_path, 'w') as f:
    json.dump(metadata, f, indent=2)

print(f"\n✅ 데이터 수집 및 청크 저장 완료.")