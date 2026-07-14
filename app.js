/* 게임지표 길드 v3.2 */
(function(){
"use strict";

window.addEventListener("error",function(){
 var box=document.getElementById("fatalError");
 if(box)box.hidden=false;
});
window.addEventListener("unhandledrejection",function(){
 var box=document.getElementById("fatalError");
 if(box)box.hidden=false;
});

const TERMS=[{"id":"DAU","term":"DAU","full":"Daily Active Users","meaning":"하루 동안 게임에 접속한 중복되지 않은 이용자 수","category":"이용자","sourcePage":1},{"id":"NRU","term":"NRU","full":"New Registered Users","meaning":"새로 가입하거나 게임을 처음 시작한 신규 유저 수","category":"이용자","sourcePage":1},{"id":"GROSS","term":"Gross / Sales","full":"Gross Sales","meaning":"게임이 발생시킨 총매출","category":"매출","sourcePage":1},{"id":"NET","term":"Net Sales","full":"Net Gross","meaning":"전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","category":"매출","sourcePage":1},{"id":"PU","term":"PU / BU","full":"Paying User / Buying User","meaning":"하루 동안 결제한 유저 수","category":"결제","sourcePage":2},{"id":"NPU","term":"NPU","full":"New Pay User","meaning":"게임에서 처음으로 결제한 유저 수","category":"결제","sourcePage":2},{"id":"MPU","term":"MPU","full":"Monthly Pay User","meaning":"한 달 동안 결제한 중복되지 않은 유저 수","category":"결제","sourcePage":2},{"id":"PUR","term":"PUR / PU Rate","full":"Pay User Rate","meaning":"DAU 중 결제한 유저(PU)의 비율","category":"결제","sourcePage":3},{"id":"MPUR","term":"MPUR / MPU Rate","full":"Monthly Pay User Rate","meaning":"MAU 중 한 달 동안 결제한 유저(MPU)의 비율","category":"결제","sourcePage":3},{"id":"ARPPU","term":"ARPPU","full":"Average Revenue Per Paying User","meaning":"결제 유저 1인당 평균 결제 금액","category":"매출","sourcePage":4},{"id":"ARPDAU","term":"ARPDAU / ARPU","full":"Average Revenue Per Daily Active User / Average Revenue Per User","meaning":"일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표","category":"매출","sourcePage":4},{"id":"RET","term":"Retention","full":"잔존율 / 지속율 / 재방문율","meaning":"신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","category":"잔존·마케팅","sourcePage":5},{"id":"ORG","term":"Organic","full":"자연유입유저","meaning":"마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","category":"잔존·마케팅","sourcePage":6},{"id":"NONORG","term":"Non Organic","full":"비자연 유입유저 / Non-Organic","meaning":"마케팅 활동을 통해 유입된 유저","category":"잔존·마케팅","sourcePage":6},{"id":"CU","term":"CU","full":"Concurrent User / 동시접속자 / 동접","meaning":"현재 같은 시간에 접속해 있는 동시접속자 수","category":"운영","sourcePage":7},{"id":"MCU","term":"MCU","full":"Maximum Concurrent User / 최고 동시접속자 / 최대동접","meaning":"일정 기간 동안 기록한 최고 동시접속자 수","category":"운영","sourcePage":7},{"id":"UV","term":"UV","full":"Unique Visit / 순방문자","meaning":"한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","category":"이용자","sourcePage":7},{"id":"TS","term":"TS / DT","full":"Time Spend / Duration Time","meaning":"사용자들이 게임에 접속해 플레이한 이용시간","category":"운영","sourcePage":8},{"id":"KPI","term":"KPI","full":"Key Performance Indicator","meaning":"목표 달성과 전략을 위한 핵심 측정 지표","category":"사업","sourcePage":8},{"id":"LTV","term":"LTV","full":"Life Time Value","meaning":"유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준","category":"잔존·마케팅","sourcePage":8},{"id":"PLC","term":"PLC","full":"Product Life Cycle","meaning":"제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","category":"사업","sourcePage":9},{"id":"BEP","term":"BEP","full":"Break Even Point / 손익분기점","meaning":"현재까지 투입된 모든 비용과 매출이 같아지는 시점","category":"사업","sourcePage":9},{"id":"ROI","term":"ROI","full":"Return On Investment / 투자수익률","meaning":"투자한 금액 대비 얻은 이익의 비율인 투자수익률","category":"사업","sourcePage":9},{"id":"CACUAC","term":"CAC / UAC","full":"Customer Acquisition Cost / User Acquisition Cost","meaning":"유저 1인을 새로 확보하는 데 필요한 비용","category":"잔존·마케팅","sourcePage":10},{"id":"UA","term":"UA","full":"User Acquisition / UA 마케팅","meaning":"신규 유저 획득을 목적으로 하는 마케팅 활동","category":"잔존·마케팅","sourcePage":10},{"id":"CRC","term":"CRC","full":"Customer Retention Cost","meaning":"기존 유저 1인을 유지하는 데 필요한 비용","category":"잔존·마케팅","sourcePage":10},{"id":"RS","term":"RS","full":"Revenue Share","meaning":"판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","category":"계약","sourcePage":10},{"id":"LF","term":"LF","full":"License Fee","meaning":"판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","category":"계약","sourcePage":10},{"id":"MG","term":"MG","full":"Minimum Guarantee","meaning":"판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","category":"계약","sourcePage":11},{"id":"MOU","term":"MOU","full":"Memorandum of Understanding / 양해각서","meaning":"정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음","category":"계약","sourcePage":11}];
const FORMULAS=[{"name":"일 결제율","formula":"PUR = PU ÷ DAU × 100","tip":"비율을 곱할 때는 3% → 0.03으로 변환"},{"name":"일 결제 유저 수","formula":"PU = DAU × PUR","tip":"PUR은 소수로 변환"},{"name":"월 결제율","formula":"MPUR = MPU ÷ MAU × 100","tip":"월간 지표끼리 계산"},{"name":"월 결제 유저 수","formula":"MPU = MAU × MPUR","tip":"MPUR은 소수로 변환"},{"name":"결제자당 평균 매출","formula":"ARPPU = Sales ÷ PU","tip":"분모는 결제한 유저 수"},{"name":"일매출","formula":"Sales = ARPPU × PU","tip":"또는 ARPPU × DAU × PUR"},{"name":"일 이용자당 평균 매출","formula":"ARPDAU = Sales ÷ DAU","tip":"전체 일 방문 유저가 분모"},{"name":"월매출","formula":"Sales = ARPPU × MAU × MPUR","tip":"MPUR은 소수로 변환"},{"name":"잔존율","formula":"Retention = 재방문 유저 ÷ 기준 유저 × 100","tip":"같은 코호트를 비교"},{"name":"유저 획득비용","formula":"CAC/UAC = 마케팅비 ÷ 신규 확보 유저 수","tip":"UA는 비용이 아니라 유저 획득 활동"},{"name":"비용 원칙","formula":"CAC + CRC < LTV","tip":"수업에서 제시한 마케팅 비용 원칙"},{"name":"순매출 예시","formula":"Net Sales = Gross × 0.90 × 0.70","tip":"한국 서비스의 부가세 10%·마켓 수수료 30% 예시"}];
const QUESTION_BANK=[{"id":"Q001","kind":"객관식·뜻→용어","difficulty":1,"prompt":"하루 동안 게임에 접속한 중복되지 않은 이용자 수에 해당하는 용어는?","answer":"DAU","accept":[],"options":["DAU","NRU","UV","Gross / Sales"],"input":false,"placeholder":"","explain":"DAU: 하루 동안 게임에 접속한 중복되지 않은 이용자 수","termId":"DAU","sourcePage":1},{"id":"Q002","kind":"객관식·용어→뜻","difficulty":1,"prompt":"DAU의 뜻으로 가장 알맞은 것은?","answer":"하루 동안 게임에 접속한 중복되지 않은 이용자 수","accept":[],"options":["하루 동안 게임에 접속한 중복되지 않은 이용자 수","새로 가입하거나 게임을 처음 시작한 신규 유저 수","한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","게임이 발생시킨 총매출"],"input":false,"placeholder":"","explain":"DAU: 하루 동안 게임에 접속한 중복되지 않은 이용자 수","termId":"DAU","sourcePage":1},{"id":"Q003","kind":"빈칸·직접입력","difficulty":2,"prompt":"DAU는 하루 동안 게임에 접속한 ________ 이용자 수다.","answer":"중복되지 않은","accept":["중복되지않은","고유한","순수한"],"options":[],"input":true,"placeholder":"정답 입력","explain":"DAU: 하루 동안 게임에 접속한 중복되지 않은 이용자 수","termId":"DAU","sourcePage":1},{"id":"Q004","kind":"객관식·뜻→용어","difficulty":1,"prompt":"새로 가입하거나 게임을 처음 시작한 신규 유저 수에 해당하는 용어는?","answer":"NRU","accept":[],"options":["NRU","DAU","UV","Gross / Sales"],"input":false,"placeholder":"","explain":"NRU: 새로 가입하거나 게임을 처음 시작한 신규 유저 수","termId":"NRU","sourcePage":1},{"id":"Q005","kind":"객관식·용어→뜻","difficulty":1,"prompt":"NRU의 뜻으로 가장 알맞은 것은?","answer":"새로 가입하거나 게임을 처음 시작한 신규 유저 수","accept":[],"options":["새로 가입하거나 게임을 처음 시작한 신규 유저 수","하루 동안 게임에 접속한 중복되지 않은 이용자 수","한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","게임이 발생시킨 총매출"],"input":false,"placeholder":"","explain":"NRU: 새로 가입하거나 게임을 처음 시작한 신규 유저 수","termId":"NRU","sourcePage":1},{"id":"Q006","kind":"빈칸·직접입력","difficulty":2,"prompt":"NRU는 새로 가입하거나 게임을 처음 시작한 ________ 수다.","answer":"신규 유저","accept":["신규유저","신규 이용자","신규이용자"],"options":[],"input":true,"placeholder":"정답 입력","explain":"NRU: 새로 가입하거나 게임을 처음 시작한 신규 유저 수","termId":"NRU","sourcePage":1},{"id":"Q007","kind":"객관식·뜻→용어","difficulty":1,"prompt":"게임이 발생시킨 총매출에 해당하는 용어는?","answer":"Gross / Sales","accept":[],"options":["Gross / Sales","Net Sales","ARPPU","ARPDAU / ARPU"],"input":false,"placeholder":"","explain":"Gross / Sales: 게임이 발생시킨 총매출","termId":"GROSS","sourcePage":1},{"id":"Q008","kind":"객관식·용어→뜻","difficulty":1,"prompt":"Gross / Sales의 뜻으로 가장 알맞은 것은?","answer":"게임이 발생시킨 총매출","accept":[],"options":["게임이 발생시킨 총매출","전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","결제 유저 1인당 평균 결제 금액","일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표"],"input":false,"placeholder":"","explain":"Gross / Sales: 게임이 발생시킨 총매출","termId":"GROSS","sourcePage":1},{"id":"Q009","kind":"빈칸·직접입력","difficulty":2,"prompt":"Gross / Sales는 게임이 발생시킨 ________을 뜻한다.","answer":"총매출","accept":["총 매출","전체 매출","전체매출"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Gross / Sales: 게임이 발생시킨 총매출","termId":"GROSS","sourcePage":1},{"id":"Q010","kind":"객관식·뜻→용어","difficulty":1,"prompt":"전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출에 해당하는 용어는?","answer":"Net Sales","accept":[],"options":["Net Sales","Gross / Sales","ARPPU","ARPDAU / ARPU"],"input":false,"placeholder":"","explain":"Net Sales: 전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","termId":"NET","sourcePage":1},{"id":"Q011","kind":"객관식·용어→뜻","difficulty":1,"prompt":"Net Sales의 뜻으로 가장 알맞은 것은?","answer":"전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","accept":[],"options":["전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","게임이 발생시킨 총매출","결제 유저 1인당 평균 결제 금액","일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표"],"input":false,"placeholder":"","explain":"Net Sales: 전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","termId":"NET","sourcePage":1},{"id":"Q012","kind":"빈칸·직접입력","difficulty":2,"prompt":"Net Sales 또는 Net Gross는 각종 비용을 제한 ________을 뜻한다.","answer":"순매출","accept":["순 매출","순수 매출","순수매출"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Net Sales: 전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","termId":"NET","sourcePage":1},{"id":"Q013","kind":"객관식·뜻→용어","difficulty":1,"prompt":"하루 동안 결제한 유저 수에 해당하는 용어는?","answer":"PU / BU","accept":[],"options":["PU / BU","NPU","MPU","PUR / PU Rate"],"input":false,"placeholder":"","explain":"PU / BU: 하루 동안 결제한 유저 수","termId":"PU","sourcePage":2},{"id":"Q014","kind":"객관식·용어→뜻","difficulty":1,"prompt":"PU / BU의 뜻으로 가장 알맞은 것은?","answer":"하루 동안 결제한 유저 수","accept":[],"options":["하루 동안 결제한 유저 수","게임에서 처음으로 결제한 유저 수","한 달 동안 결제한 중복되지 않은 유저 수","DAU 중 결제한 유저(PU)의 비율"],"input":false,"placeholder":"","explain":"PU / BU: 하루 동안 결제한 유저 수","termId":"PU","sourcePage":2},{"id":"Q015","kind":"빈칸·직접입력","difficulty":2,"prompt":"PU 또는 BU는 ________ 결제 유저 수다.","answer":"일일","accept":["하루","하루 동안","하루동안"],"options":[],"input":true,"placeholder":"정답 입력","explain":"PU / BU: 하루 동안 결제한 유저 수","termId":"PU","sourcePage":2},{"id":"Q016","kind":"객관식·뜻→용어","difficulty":1,"prompt":"게임에서 처음으로 결제한 유저 수에 해당하는 용어는?","answer":"NPU","accept":[],"options":["NPU","PU / BU","MPU","PUR / PU Rate"],"input":false,"placeholder":"","explain":"NPU: 게임에서 처음으로 결제한 유저 수","termId":"NPU","sourcePage":2},{"id":"Q017","kind":"객관식·용어→뜻","difficulty":1,"prompt":"NPU의 뜻으로 가장 알맞은 것은?","answer":"게임에서 처음으로 결제한 유저 수","accept":[],"options":["게임에서 처음으로 결제한 유저 수","하루 동안 결제한 유저 수","한 달 동안 결제한 중복되지 않은 유저 수","DAU 중 결제한 유저(PU)의 비율"],"input":false,"placeholder":"","explain":"NPU: 게임에서 처음으로 결제한 유저 수","termId":"NPU","sourcePage":2},{"id":"Q018","kind":"빈칸·직접입력","difficulty":2,"prompt":"NPU는 게임에서 ________ 결제한 유저 수다.","answer":"처음으로","accept":["처음","첫 결제한","첫결제한","최초로"],"options":[],"input":true,"placeholder":"정답 입력","explain":"NPU: 게임에서 처음으로 결제한 유저 수","termId":"NPU","sourcePage":2},{"id":"Q019","kind":"객관식·뜻→용어","difficulty":1,"prompt":"한 달 동안 결제한 중복되지 않은 유저 수에 해당하는 용어는?","answer":"MPU","accept":[],"options":["MPU","PU / BU","NPU","PUR / PU Rate"],"input":false,"placeholder":"","explain":"MPU: 한 달 동안 결제한 중복되지 않은 유저 수","termId":"MPU","sourcePage":2},{"id":"Q020","kind":"객관식·용어→뜻","difficulty":1,"prompt":"MPU의 뜻으로 가장 알맞은 것은?","answer":"한 달 동안 결제한 중복되지 않은 유저 수","accept":[],"options":["한 달 동안 결제한 중복되지 않은 유저 수","하루 동안 결제한 유저 수","게임에서 처음으로 결제한 유저 수","DAU 중 결제한 유저(PU)의 비율"],"input":false,"placeholder":"","explain":"MPU: 한 달 동안 결제한 중복되지 않은 유저 수","termId":"MPU","sourcePage":2},{"id":"Q021","kind":"빈칸·직접입력","difficulty":2,"prompt":"MPU는 ________ 동안 결제한 중복되지 않은 유저 수다.","answer":"한 달","accept":["한달","월간"],"options":[],"input":true,"placeholder":"정답 입력","explain":"MPU: 한 달 동안 결제한 중복되지 않은 유저 수","termId":"MPU","sourcePage":2},{"id":"Q022","kind":"객관식·뜻→용어","difficulty":1,"prompt":"DAU 중 결제한 유저(PU)의 비율에 해당하는 용어는?","answer":"PUR / PU Rate","accept":[],"options":["PUR / PU Rate","PU / BU","NPU","MPU"],"input":false,"placeholder":"","explain":"PUR / PU Rate: DAU 중 결제한 유저(PU)의 비율","termId":"PUR","sourcePage":3},{"id":"Q023","kind":"객관식·용어→뜻","difficulty":1,"prompt":"PUR / PU Rate의 뜻으로 가장 알맞은 것은?","answer":"DAU 중 결제한 유저(PU)의 비율","accept":[],"options":["DAU 중 결제한 유저(PU)의 비율","하루 동안 결제한 유저 수","게임에서 처음으로 결제한 유저 수","한 달 동안 결제한 중복되지 않은 유저 수"],"input":false,"placeholder":"","explain":"PUR / PU Rate: DAU 중 결제한 유저(PU)의 비율","termId":"PUR","sourcePage":3},{"id":"Q024","kind":"빈칸·직접입력","difficulty":2,"prompt":"PUR은 DAU 중 ________의 비율이다.","answer":"PU","accept":["pu","결제 유저","결제유저"],"options":[],"input":true,"placeholder":"정답 입력","explain":"PUR / PU Rate: DAU 중 결제한 유저(PU)의 비율","termId":"PUR","sourcePage":3},{"id":"Q025","kind":"객관식·뜻→용어","difficulty":1,"prompt":"MAU 중 한 달 동안 결제한 유저(MPU)의 비율에 해당하는 용어는?","answer":"MPUR / MPU Rate","accept":[],"options":["MPUR / MPU Rate","PU / BU","NPU","MPU"],"input":false,"placeholder":"","explain":"MPUR / MPU Rate: MAU 중 한 달 동안 결제한 유저(MPU)의 비율","termId":"MPUR","sourcePage":3},{"id":"Q026","kind":"객관식·용어→뜻","difficulty":1,"prompt":"MPUR / MPU Rate의 뜻으로 가장 알맞은 것은?","answer":"MAU 중 한 달 동안 결제한 유저(MPU)의 비율","accept":[],"options":["MAU 중 한 달 동안 결제한 유저(MPU)의 비율","하루 동안 결제한 유저 수","게임에서 처음으로 결제한 유저 수","한 달 동안 결제한 중복되지 않은 유저 수"],"input":false,"placeholder":"","explain":"MPUR / MPU Rate: MAU 중 한 달 동안 결제한 유저(MPU)의 비율","termId":"MPUR","sourcePage":3},{"id":"Q027","kind":"빈칸·직접입력","difficulty":2,"prompt":"MPUR은 MAU 중 ________의 비율이다.","answer":"MPU","accept":["mpu","월 결제 유저","월결제유저"],"options":[],"input":true,"placeholder":"정답 입력","explain":"MPUR / MPU Rate: MAU 중 한 달 동안 결제한 유저(MPU)의 비율","termId":"MPUR","sourcePage":3},{"id":"Q028","kind":"객관식·뜻→용어","difficulty":1,"prompt":"결제 유저 1인당 평균 결제 금액에 해당하는 용어는?","answer":"ARPPU","accept":[],"options":["ARPPU","Gross / Sales","Net Sales","ARPDAU / ARPU"],"input":false,"placeholder":"","explain":"ARPPU: 결제 유저 1인당 평균 결제 금액","termId":"ARPPU","sourcePage":4},{"id":"Q029","kind":"객관식·용어→뜻","difficulty":1,"prompt":"ARPPU의 뜻으로 가장 알맞은 것은?","answer":"결제 유저 1인당 평균 결제 금액","accept":[],"options":["결제 유저 1인당 평균 결제 금액","게임이 발생시킨 총매출","전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표"],"input":false,"placeholder":"","explain":"ARPPU: 결제 유저 1인당 평균 결제 금액","termId":"ARPPU","sourcePage":4},{"id":"Q030","kind":"빈칸·직접입력","difficulty":2,"prompt":"ARPPU는 ________ 1인당 평균 결제 금액이다.","answer":"결제 유저","accept":["결제유저","결제자"],"options":[],"input":true,"placeholder":"정답 입력","explain":"ARPPU: 결제 유저 1인당 평균 결제 금액","termId":"ARPPU","sourcePage":4},{"id":"Q031","kind":"객관식·뜻→용어","difficulty":1,"prompt":"일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표에 해당하는 용어는?","answer":"ARPDAU / ARPU","accept":[],"options":["ARPDAU / ARPU","Gross / Sales","Net Sales","ARPPU"],"input":false,"placeholder":"","explain":"ARPDAU / ARPU: 일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표","termId":"ARPDAU","sourcePage":4},{"id":"Q032","kind":"객관식·용어→뜻","difficulty":1,"prompt":"ARPDAU / ARPU의 뜻으로 가장 알맞은 것은?","answer":"일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표","accept":[],"options":["일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표","게임이 발생시킨 총매출","전체 매출에서 부가세·마켓 수수료·플랫폼 수수료 등의 비용을 제한 순매출","결제 유저 1인당 평균 결제 금액"],"input":false,"placeholder":"","explain":"ARPDAU / ARPU: 일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표","termId":"ARPDAU","sourcePage":4},{"id":"Q033","kind":"빈칸·직접입력","difficulty":2,"prompt":"ARPDAU는 매출을 ________로 나눈 값이다.","answer":"DAU","accept":["dau","일일 활성 이용자 수","일일활성이용자수"],"options":[],"input":true,"placeholder":"정답 입력","explain":"ARPDAU / ARPU: 일 방문 유저당 평균 결제 금액으로, 매출과 유저 수를 함께 보는 효율 지표","termId":"ARPDAU","sourcePage":4},{"id":"Q034","kind":"객관식·뜻→용어","difficulty":1,"prompt":"신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율에 해당하는 용어는?","answer":"Retention","accept":[],"options":["Retention","Organic","Non Organic","LTV"],"input":false,"placeholder":"","explain":"Retention: 신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","termId":"RET","sourcePage":5},{"id":"Q035","kind":"객관식·용어→뜻","difficulty":1,"prompt":"Retention의 뜻으로 가장 알맞은 것은?","answer":"신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","accept":[],"options":["신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","마케팅 활동을 통해 유입된 유저","유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준"],"input":false,"placeholder":"","explain":"Retention: 신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","termId":"RET","sourcePage":5},{"id":"Q036","kind":"빈칸·직접입력","difficulty":2,"prompt":"Retention은 신규 가입 유저의 ________ 비율을 수치화한 지표다.","answer":"재방문","accept":["재 방문","잔존","지속"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Retention: 신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","termId":"RET","sourcePage":5},{"id":"Q037","kind":"객관식·뜻→용어","difficulty":1,"prompt":"마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저에 해당하는 용어는?","answer":"Organic","accept":[],"options":["Organic","Retention","Non Organic","LTV"],"input":false,"placeholder":"","explain":"Organic: 마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","termId":"ORG","sourcePage":6},{"id":"Q038","kind":"객관식·용어→뜻","difficulty":1,"prompt":"Organic의 뜻으로 가장 알맞은 것은?","answer":"마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","accept":[],"options":["마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","마케팅 활동을 통해 유입된 유저","유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준"],"input":false,"placeholder":"","explain":"Organic: 마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","termId":"ORG","sourcePage":6},{"id":"Q039","kind":"빈칸·직접입력","difficulty":2,"prompt":"Organic 유저는 ________ 없이 자연스럽게 유입된 유저다.","answer":"마케팅","accept":["광고","마케팅 활동","마케팅활동"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Organic: 마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","termId":"ORG","sourcePage":6},{"id":"Q040","kind":"객관식·뜻→용어","difficulty":1,"prompt":"마케팅 활동을 통해 유입된 유저에 해당하는 용어는?","answer":"Non Organic","accept":[],"options":["Non Organic","Retention","Organic","LTV"],"input":false,"placeholder":"","explain":"Non Organic: 마케팅 활동을 통해 유입된 유저","termId":"NONORG","sourcePage":6},{"id":"Q041","kind":"객관식·용어→뜻","difficulty":1,"prompt":"Non Organic의 뜻으로 가장 알맞은 것은?","answer":"마케팅 활동을 통해 유입된 유저","accept":[],"options":["마케팅 활동을 통해 유입된 유저","신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준"],"input":false,"placeholder":"","explain":"Non Organic: 마케팅 활동을 통해 유입된 유저","termId":"NONORG","sourcePage":6},{"id":"Q042","kind":"빈칸·직접입력","difficulty":2,"prompt":"Non Organic 유저는 ________ 활동을 통해 유입된 유저다.","answer":"마케팅","accept":["광고","UA"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Non Organic: 마케팅 활동을 통해 유입된 유저","termId":"NONORG","sourcePage":6},{"id":"Q043","kind":"객관식·뜻→용어","difficulty":1,"prompt":"현재 같은 시간에 접속해 있는 동시접속자 수에 해당하는 용어는?","answer":"CU","accept":[],"options":["CU","MCU","TS / DT","DAU"],"input":false,"placeholder":"","explain":"CU: 현재 같은 시간에 접속해 있는 동시접속자 수","termId":"CU","sourcePage":7},{"id":"Q044","kind":"객관식·용어→뜻","difficulty":1,"prompt":"CU의 뜻으로 가장 알맞은 것은?","answer":"현재 같은 시간에 접속해 있는 동시접속자 수","accept":[],"options":["현재 같은 시간에 접속해 있는 동시접속자 수","일정 기간 동안 기록한 최고 동시접속자 수","사용자들이 게임에 접속해 플레이한 이용시간","하루 동안 게임에 접속한 중복되지 않은 이용자 수"],"input":false,"placeholder":"","explain":"CU: 현재 같은 시간에 접속해 있는 동시접속자 수","termId":"CU","sourcePage":7},{"id":"Q045","kind":"빈칸·직접입력","difficulty":2,"prompt":"CU는 현재 같은 시간에 접속해 있는 ________ 수다.","answer":"동시접속자","accept":["동접","동시 접속자"],"options":[],"input":true,"placeholder":"정답 입력","explain":"CU: 현재 같은 시간에 접속해 있는 동시접속자 수","termId":"CU","sourcePage":7},{"id":"Q046","kind":"객관식·뜻→용어","difficulty":1,"prompt":"일정 기간 동안 기록한 최고 동시접속자 수에 해당하는 용어는?","answer":"MCU","accept":[],"options":["MCU","CU","TS / DT","DAU"],"input":false,"placeholder":"","explain":"MCU: 일정 기간 동안 기록한 최고 동시접속자 수","termId":"MCU","sourcePage":7},{"id":"Q047","kind":"객관식·용어→뜻","difficulty":1,"prompt":"MCU의 뜻으로 가장 알맞은 것은?","answer":"일정 기간 동안 기록한 최고 동시접속자 수","accept":[],"options":["일정 기간 동안 기록한 최고 동시접속자 수","현재 같은 시간에 접속해 있는 동시접속자 수","사용자들이 게임에 접속해 플레이한 이용시간","하루 동안 게임에 접속한 중복되지 않은 이용자 수"],"input":false,"placeholder":"","explain":"MCU: 일정 기간 동안 기록한 최고 동시접속자 수","termId":"MCU","sourcePage":7},{"id":"Q048","kind":"빈칸·직접입력","difficulty":2,"prompt":"MCU는 일정 기간 동안 기록한 ________ 동시접속자 수다.","answer":"최고","accept":["최대","가장 높은","가장높은"],"options":[],"input":true,"placeholder":"정답 입력","explain":"MCU: 일정 기간 동안 기록한 최고 동시접속자 수","termId":"MCU","sourcePage":7},{"id":"Q049","kind":"객관식·뜻→용어","difficulty":1,"prompt":"한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용에 해당하는 용어는?","answer":"UV","accept":[],"options":["UV","DAU","NRU","Gross / Sales"],"input":false,"placeholder":"","explain":"UV: 한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","termId":"UV","sourcePage":7},{"id":"Q050","kind":"객관식·용어→뜻","difficulty":1,"prompt":"UV의 뜻으로 가장 알맞은 것은?","answer":"한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","accept":[],"options":["한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","하루 동안 게임에 접속한 중복되지 않은 이용자 수","새로 가입하거나 게임을 처음 시작한 신규 유저 수","게임이 발생시킨 총매출"],"input":false,"placeholder":"","explain":"UV: 한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","termId":"UV","sourcePage":7},{"id":"Q051","kind":"빈칸·직접입력","difficulty":2,"prompt":"UV는 한 번 이상 방문한 중복되지 않은 ________ 수다.","answer":"순방문자","accept":["순 방문자","사용자","유저"],"options":[],"input":true,"placeholder":"정답 입력","explain":"UV: 한 번 이상 방문한 중복되지 않은 순방문자 수로, DAU와 유사하며 주로 웹에서 사용","termId":"UV","sourcePage":7},{"id":"Q052","kind":"객관식·뜻→용어","difficulty":1,"prompt":"사용자들이 게임에 접속해 플레이한 이용시간에 해당하는 용어는?","answer":"TS / DT","accept":[],"options":["TS / DT","CU","MCU","DAU"],"input":false,"placeholder":"","explain":"TS / DT: 사용자들이 게임에 접속해 플레이한 이용시간","termId":"TS","sourcePage":8},{"id":"Q053","kind":"객관식·용어→뜻","difficulty":1,"prompt":"TS / DT의 뜻으로 가장 알맞은 것은?","answer":"사용자들이 게임에 접속해 플레이한 이용시간","accept":[],"options":["사용자들이 게임에 접속해 플레이한 이용시간","현재 같은 시간에 접속해 있는 동시접속자 수","일정 기간 동안 기록한 최고 동시접속자 수","하루 동안 게임에 접속한 중복되지 않은 이용자 수"],"input":false,"placeholder":"","explain":"TS / DT: 사용자들이 게임에 접속해 플레이한 이용시간","termId":"TS","sourcePage":8},{"id":"Q054","kind":"빈칸·직접입력","difficulty":2,"prompt":"TS 또는 DT는 사용자가 게임에 접속해 플레이한 ________이다.","answer":"이용시간","accept":["이용 시간","플레이 시간","플레이시간"],"options":[],"input":true,"placeholder":"정답 입력","explain":"TS / DT: 사용자들이 게임에 접속해 플레이한 이용시간","termId":"TS","sourcePage":8},{"id":"Q055","kind":"객관식·뜻→용어","difficulty":1,"prompt":"목표 달성과 전략을 위한 핵심 측정 지표에 해당하는 용어는?","answer":"KPI","accept":[],"options":["KPI","PLC","BEP","ROI"],"input":false,"placeholder":"","explain":"KPI: 목표 달성과 전략을 위한 핵심 측정 지표","termId":"KPI","sourcePage":8},{"id":"Q056","kind":"객관식·용어→뜻","difficulty":1,"prompt":"KPI의 뜻으로 가장 알맞은 것은?","answer":"목표 달성과 전략을 위한 핵심 측정 지표","accept":[],"options":["목표 달성과 전략을 위한 핵심 측정 지표","제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","현재까지 투입된 모든 비용과 매출이 같아지는 시점","투자한 금액 대비 얻은 이익의 비율인 투자수익률"],"input":false,"placeholder":"","explain":"KPI: 목표 달성과 전략을 위한 핵심 측정 지표","termId":"KPI","sourcePage":8},{"id":"Q057","kind":"빈칸·직접입력","difficulty":2,"prompt":"KPI는 목표 달성과 전략을 위한 ________ 지표다.","answer":"핵심 측정","accept":["핵심측정","핵심 성과","핵심성과"],"options":[],"input":true,"placeholder":"정답 입력","explain":"KPI: 목표 달성과 전략을 위한 핵심 측정 지표","termId":"KPI","sourcePage":8},{"id":"Q058","kind":"객관식·뜻→용어","difficulty":1,"prompt":"유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준에 해당하는 용어는?","answer":"LTV","accept":[],"options":["LTV","Retention","Organic","Non Organic"],"input":false,"placeholder":"","explain":"LTV: 유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준","termId":"LTV","sourcePage":8},{"id":"Q059","kind":"객관식·용어→뜻","difficulty":1,"prompt":"LTV의 뜻으로 가장 알맞은 것은?","answer":"유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준","accept":[],"options":["유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준","신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","마케팅 활동을 통해 유입된 유저"],"input":false,"placeholder":"","explain":"LTV: 유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준","termId":"LTV","sourcePage":8},{"id":"Q060","kind":"빈칸·직접입력","difficulty":2,"prompt":"LTV는 유저가 게임에서 완전히 ________ 때까지 결제하는 금액이다.","answer":"이탈할","accept":["떠날","이탈하기 전","이탈하기전"],"options":[],"input":true,"placeholder":"정답 입력","explain":"LTV: 유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액으로, 수업에서는 순이익 기준","termId":"LTV","sourcePage":8},{"id":"Q061","kind":"객관식·뜻→용어","difficulty":1,"prompt":"제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석에 해당하는 용어는?","answer":"PLC","accept":[],"options":["PLC","KPI","BEP","ROI"],"input":false,"placeholder":"","explain":"PLC: 제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","termId":"PLC","sourcePage":9},{"id":"Q062","kind":"객관식·용어→뜻","difficulty":1,"prompt":"PLC의 뜻으로 가장 알맞은 것은?","answer":"제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","accept":[],"options":["제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","목표 달성과 전략을 위한 핵심 측정 지표","현재까지 투입된 모든 비용과 매출이 같아지는 시점","투자한 금액 대비 얻은 이익의 비율인 투자수익률"],"input":false,"placeholder":"","explain":"PLC: 제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","termId":"PLC","sourcePage":9},{"id":"Q063","kind":"빈칸·직접입력","difficulty":2,"prompt":"PLC는 Product Life Cycle, 즉 제품 ________다.","answer":"수명주기","accept":["수명 주기","생애주기","생애 주기"],"options":[],"input":true,"placeholder":"정답 입력","explain":"PLC: 제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","termId":"PLC","sourcePage":9},{"id":"Q064","kind":"객관식·뜻→용어","difficulty":1,"prompt":"현재까지 투입된 모든 비용과 매출이 같아지는 시점에 해당하는 용어는?","answer":"BEP","accept":[],"options":["BEP","KPI","PLC","ROI"],"input":false,"placeholder":"","explain":"BEP: 현재까지 투입된 모든 비용과 매출이 같아지는 시점","termId":"BEP","sourcePage":9},{"id":"Q065","kind":"객관식·용어→뜻","difficulty":1,"prompt":"BEP의 뜻으로 가장 알맞은 것은?","answer":"현재까지 투입된 모든 비용과 매출이 같아지는 시점","accept":[],"options":["현재까지 투입된 모든 비용과 매출이 같아지는 시점","목표 달성과 전략을 위한 핵심 측정 지표","제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","투자한 금액 대비 얻은 이익의 비율인 투자수익률"],"input":false,"placeholder":"","explain":"BEP: 현재까지 투입된 모든 비용과 매출이 같아지는 시점","termId":"BEP","sourcePage":9},{"id":"Q066","kind":"빈칸·직접입력","difficulty":2,"prompt":"BEP는 누적 비용과 ________이 같아지는 시점이다.","answer":"매출","accept":["누적 매출","누적매출","수익"],"options":[],"input":true,"placeholder":"정답 입력","explain":"BEP: 현재까지 투입된 모든 비용과 매출이 같아지는 시점","termId":"BEP","sourcePage":9},{"id":"Q067","kind":"객관식·뜻→용어","difficulty":1,"prompt":"투자한 금액 대비 얻은 이익의 비율인 투자수익률에 해당하는 용어는?","answer":"ROI","accept":[],"options":["ROI","KPI","PLC","BEP"],"input":false,"placeholder":"","explain":"ROI: 투자한 금액 대비 얻은 이익의 비율인 투자수익률","termId":"ROI","sourcePage":9},{"id":"Q068","kind":"객관식·용어→뜻","difficulty":1,"prompt":"ROI의 뜻으로 가장 알맞은 것은?","answer":"투자한 금액 대비 얻은 이익의 비율인 투자수익률","accept":[],"options":["투자한 금액 대비 얻은 이익의 비율인 투자수익률","목표 달성과 전략을 위한 핵심 측정 지표","제품 수명주기로, 게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기를 분석","현재까지 투입된 모든 비용과 매출이 같아지는 시점"],"input":false,"placeholder":"","explain":"ROI: 투자한 금액 대비 얻은 이익의 비율인 투자수익률","termId":"ROI","sourcePage":9},{"id":"Q069","kind":"빈칸·직접입력","difficulty":2,"prompt":"ROI는 투자 금액 대비 얻은 ________의 비율이다.","answer":"이익","accept":["수익","성과"],"options":[],"input":true,"placeholder":"정답 입력","explain":"ROI: 투자한 금액 대비 얻은 이익의 비율인 투자수익률","termId":"ROI","sourcePage":9},{"id":"Q070","kind":"객관식·뜻→용어","difficulty":1,"prompt":"유저 1인을 새로 확보하는 데 필요한 비용에 해당하는 용어는?","answer":"CAC / UAC","accept":[],"options":["CAC / UAC","Retention","Organic","Non Organic"],"input":false,"placeholder":"","explain":"CAC / UAC: 유저 1인을 새로 확보하는 데 필요한 비용","termId":"CACUAC","sourcePage":10},{"id":"Q071","kind":"객관식·용어→뜻","difficulty":1,"prompt":"CAC / UAC의 뜻으로 가장 알맞은 것은?","answer":"유저 1인을 새로 확보하는 데 필요한 비용","accept":[],"options":["유저 1인을 새로 확보하는 데 필요한 비용","신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","마케팅 활동을 통해 유입된 유저"],"input":false,"placeholder":"","explain":"CAC / UAC: 유저 1인을 새로 확보하는 데 필요한 비용","termId":"CACUAC","sourcePage":10},{"id":"Q072","kind":"빈칸·직접입력","difficulty":2,"prompt":"CAC 또는 UAC는 유저 1인을 새로 ________ 데 필요한 비용이다.","answer":"확보하는","accept":["획득하는","유치하는"],"options":[],"input":true,"placeholder":"정답 입력","explain":"CAC / UAC: 유저 1인을 새로 확보하는 데 필요한 비용","termId":"CACUAC","sourcePage":10},{"id":"Q073","kind":"객관식·뜻→용어","difficulty":1,"prompt":"신규 유저 획득을 목적으로 하는 마케팅 활동에 해당하는 용어는?","answer":"UA","accept":[],"options":["UA","Retention","Organic","Non Organic"],"input":false,"placeholder":"","explain":"UA: 신규 유저 획득을 목적으로 하는 마케팅 활동","termId":"UA","sourcePage":10},{"id":"Q074","kind":"객관식·용어→뜻","difficulty":1,"prompt":"UA의 뜻으로 가장 알맞은 것은?","answer":"신규 유저 획득을 목적으로 하는 마케팅 활동","accept":[],"options":["신규 유저 획득을 목적으로 하는 마케팅 활동","신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","마케팅 활동을 통해 유입된 유저"],"input":false,"placeholder":"","explain":"UA: 신규 유저 획득을 목적으로 하는 마케팅 활동","termId":"UA","sourcePage":10},{"id":"Q075","kind":"빈칸·직접입력","difficulty":2,"prompt":"UA는 비용 지표 이름이 아니라 신규 유저 ________을 뜻하는 마케팅 활동이다.","answer":"획득","accept":["확보","유치"],"options":[],"input":true,"placeholder":"정답 입력","explain":"UA: 신규 유저 획득을 목적으로 하는 마케팅 활동","termId":"UA","sourcePage":10},{"id":"Q076","kind":"객관식·뜻→용어","difficulty":1,"prompt":"기존 유저 1인을 유지하는 데 필요한 비용에 해당하는 용어는?","answer":"CRC","accept":[],"options":["CRC","Retention","Organic","Non Organic"],"input":false,"placeholder":"","explain":"CRC: 기존 유저 1인을 유지하는 데 필요한 비용","termId":"CRC","sourcePage":10},{"id":"Q077","kind":"객관식·용어→뜻","difficulty":1,"prompt":"CRC의 뜻으로 가장 알맞은 것은?","answer":"기존 유저 1인을 유지하는 데 필요한 비용","accept":[],"options":["기존 유저 1인을 유지하는 데 필요한 비용","신규 가입 유저 중 일정 시간이 지난 뒤에도 다시 방문하는 유저의 비율","마케팅 없이 유저 본인의 의지로 자연스럽게 유입된 유저","마케팅 활동을 통해 유입된 유저"],"input":false,"placeholder":"","explain":"CRC: 기존 유저 1인을 유지하는 데 필요한 비용","termId":"CRC","sourcePage":10},{"id":"Q078","kind":"빈칸·직접입력","difficulty":2,"prompt":"CRC는 기존 유저 1인을 ________ 데 필요한 비용이다.","answer":"유지하는","accept":["잔존시키는","남게 하는","남게하는"],"options":[],"input":true,"placeholder":"정답 입력","explain":"CRC: 기존 유저 1인을 유지하는 데 필요한 비용","termId":"CRC","sourcePage":10},{"id":"Q079","kind":"객관식·뜻→용어","difficulty":1,"prompt":"판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율에 해당하는 용어는?","answer":"RS","accept":[],"options":["RS","LF","MG","MOU"],"input":false,"placeholder":"","explain":"RS: 판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","termId":"RS","sourcePage":10},{"id":"Q080","kind":"객관식·용어→뜻","difficulty":1,"prompt":"RS의 뜻으로 가장 알맞은 것은?","answer":"판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","accept":[],"options":["판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음"],"input":false,"placeholder":"","explain":"RS: 판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","termId":"RS","sourcePage":10},{"id":"Q081","kind":"빈칸·직접입력","difficulty":2,"prompt":"RS는 개발사와 퍼블리셔 간의 ________ 비율이다.","answer":"수익 분배","accept":["수익분배","매출 분배","매출분배"],"options":[],"input":true,"placeholder":"정답 입력","explain":"RS: 판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","termId":"RS","sourcePage":10},{"id":"Q082","kind":"객관식·뜻→용어","difficulty":1,"prompt":"판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금에 해당하는 용어는?","answer":"LF","accept":[],"options":["LF","RS","MG","MOU"],"input":false,"placeholder":"","explain":"LF: 판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","termId":"LF","sourcePage":10},{"id":"Q083","kind":"객관식·용어→뜻","difficulty":1,"prompt":"LF의 뜻으로 가장 알맞은 것은?","answer":"판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","accept":[],"options":["판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음"],"input":false,"placeholder":"","explain":"LF: 판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","termId":"LF","sourcePage":10},{"id":"Q084","kind":"빈칸·직접입력","difficulty":2,"prompt":"LF는 판권 제공 시 퍼블리셔가 개발사에 지급하는 ________이다.","answer":"계약금","accept":["계약 금액","계약금액"],"options":[],"input":true,"placeholder":"정답 입력","explain":"LF: 판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","termId":"LF","sourcePage":10},{"id":"Q085","kind":"객관식·뜻→용어","difficulty":1,"prompt":"판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액에 해당하는 용어는?","answer":"MG","accept":[],"options":["MG","RS","LF","MOU"],"input":false,"placeholder":"","explain":"MG: 판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","termId":"MG","sourcePage":11},{"id":"Q086","kind":"객관식·용어→뜻","difficulty":1,"prompt":"MG의 뜻으로 가장 알맞은 것은?","answer":"판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","accept":[],"options":["판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음"],"input":false,"placeholder":"","explain":"MG: 판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","termId":"MG","sourcePage":11},{"id":"Q087","kind":"빈칸·직접입력","difficulty":2,"prompt":"MG는 판권 제공자의 최소 ________을 보장하기 위한 선지급금이다.","answer":"수익","accept":["수익금","매출"],"options":[],"input":true,"placeholder":"정답 입력","explain":"MG: 판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액","termId":"MG","sourcePage":11},{"id":"Q088","kind":"객관식·뜻→용어","difficulty":1,"prompt":"정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음에 해당하는 용어는?","answer":"MOU","accept":[],"options":["MOU","RS","LF","MG"],"input":false,"placeholder":"","explain":"MOU: 정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음","termId":"MOU","sourcePage":11},{"id":"Q089","kind":"객관식·용어→뜻","difficulty":1,"prompt":"MOU의 뜻으로 가장 알맞은 것은?","answer":"정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음","accept":[],"options":["정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음","판권 제공사(개발사)와 퍼블리셔 간의 수익 분배 비율","판권 제공 시 퍼블리셔가 개발사에 지급하는 계약금","판권 제공자의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액"],"input":false,"placeholder":"","explain":"MOU: 정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음","termId":"MOU","sourcePage":11},{"id":"Q090","kind":"빈칸·직접입력","difficulty":2,"prompt":"MOU는 정식 계약 ________ 작성하는 사전 협의·양해 문서다.","answer":"전","accept":["이전","전에"],"options":[],"input":true,"placeholder":"정답 입력","explain":"MOU: 정식 계약 전 거래와 정보 보호 등에 대해 사전 협의한 양해 문서로, 수업 기준 법적 구속력은 없음","termId":"MOU","sourcePage":11},{"id":"Q091","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"DAU의 영문 표현으로 알맞은 것은?","answer":"Daily Active Users","accept":[],"options":["Daily Active Users","New Registered Users","Unique Visit","Gross Sales"],"input":false,"placeholder":"","explain":"DAU = Daily Active Users","termId":"DAU","sourcePage":1},{"id":"Q092","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"NRU의 영문 표현으로 알맞은 것은?","answer":"New Registered Users","accept":[],"options":["New Registered Users","Daily Active Users","Unique Visit","Gross Sales"],"input":false,"placeholder":"","explain":"NRU = New Registered Users","termId":"NRU","sourcePage":1},{"id":"Q093","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"수업에서 Gross / Sales를 합쳐 표현한 말은?","answer":"Gross Sales","accept":[],"options":["Gross Sales","Net Sales","Net Gross","Revenue Share"],"input":false,"placeholder":"","explain":"Gross / Sales = Gross Sales = 총매출.","termId":"GROSS","sourcePage":1},{"id":"Q094","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"수업에서 Net Sales와 같은 의미로 함께 사용한 표현은?","answer":"Net Gross","accept":[],"options":["Net Gross","Gross Sales","Gross Profit","Revenue Share"],"input":false,"placeholder":"","explain":"Net Sales와 Net Gross는 수업에서 순매출을 뜻하는 동의 표현으로 제시됐다.","termId":"NET","sourcePage":1},{"id":"Q095","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"PU / BU의 영문 표현으로 알맞은 것은?","answer":"Paying User / Buying User","accept":[],"options":["Paying User / Buying User","Pay User Rate","Monthly Pay User","User Acquisition"],"input":false,"placeholder":"","explain":"PU는 Paying User, BU는 Buying User이며 둘 다 일일 결제 유저를 뜻한다.","termId":"PU","sourcePage":2},{"id":"Q096","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"NPU의 영문 표현으로 알맞은 것은?","answer":"New Pay User","accept":[],"options":["New Pay User","Paying User / Buying User","Monthly Pay User","Pay User Rate"],"input":false,"placeholder":"","explain":"NPU = New Pay User","termId":"NPU","sourcePage":2},{"id":"Q097","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"MPU의 영문 표현으로 알맞은 것은?","answer":"Monthly Pay User","accept":[],"options":["Monthly Pay User","Paying User / Buying User","New Pay User","Pay User Rate"],"input":false,"placeholder":"","explain":"MPU = Monthly Pay User","termId":"MPU","sourcePage":2},{"id":"Q098","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"PUR / PU Rate의 영문 표현으로 알맞은 것은?","answer":"Pay User Rate","accept":[],"options":["Pay User Rate","Paying User / Buying User","New Pay User","Monthly Pay User"],"input":false,"placeholder":"","explain":"PUR / PU Rate = Pay User Rate","termId":"PUR","sourcePage":3},{"id":"Q099","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"MPUR / MPU Rate의 영문 표현으로 알맞은 것은?","answer":"Monthly Pay User Rate","accept":[],"options":["Monthly Pay User Rate","Paying User / Buying User","New Pay User","Monthly Pay User"],"input":false,"placeholder":"","explain":"MPUR / MPU Rate = Monthly Pay User Rate","termId":"MPUR","sourcePage":3},{"id":"Q100","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"ARPPU의 영문 표현으로 알맞은 것은?","answer":"Average Revenue Per Paying User","accept":[],"options":["Average Revenue Per Paying User","Gross Sales","Net Gross","Average Revenue Per Daily Active User / Average Revenue Per User"],"input":false,"placeholder":"","explain":"ARPPU = Average Revenue Per Paying User","termId":"ARPPU","sourcePage":4},{"id":"Q101","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"ARPDAU / ARPU의 영문 표현으로 알맞은 것은?","answer":"Average Revenue Per Daily Active User / Average Revenue Per User","accept":[],"options":["Average Revenue Per Daily Active User / Average Revenue Per User","Average Revenue Per Paying User","Monthly Pay User Rate","Return On Investment"],"input":false,"placeholder":"","explain":"ARPDAU는 Average Revenue Per Daily Active User, ARPU는 Average Revenue Per User.","termId":"ARPDAU","sourcePage":4},{"id":"Q102","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"CU의 영문 표현으로 알맞은 것은?","answer":"Concurrent User","accept":[],"options":["Concurrent User","Maximum Concurrent User","Time Spend / Duration Time","Daily Active Users"],"input":false,"placeholder":"","explain":"CU = Concurrent User","termId":"CU","sourcePage":7},{"id":"Q103","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"MCU의 영문 표현으로 알맞은 것은?","answer":"Maximum Concurrent User","accept":[],"options":["Maximum Concurrent User","Concurrent User","Time Spend / Duration Time","Daily Active Users"],"input":false,"placeholder":"","explain":"MCU = Maximum Concurrent User","termId":"MCU","sourcePage":7},{"id":"Q104","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"UV의 영문 표현으로 알맞은 것은?","answer":"Unique Visit","accept":[],"options":["Unique Visit","Daily Active Users","New Registered Users","Gross Sales"],"input":false,"placeholder":"","explain":"UV = Unique Visit","termId":"UV","sourcePage":7},{"id":"Q105","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"TS / DT의 영문 표현으로 알맞은 것은?","answer":"Time Spend / Duration Time","accept":[],"options":["Time Spend / Duration Time","Concurrent User","Maximum Concurrent User","Daily Active Users"],"input":false,"placeholder":"","explain":"TS / DT = Time Spend / Duration Time","termId":"TS","sourcePage":8},{"id":"Q106","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"KPI의 영문 표현으로 알맞은 것은?","answer":"Key Performance Indicator","accept":[],"options":["Key Performance Indicator","Product Life Cycle","Break Even Point","Return On Investment"],"input":false,"placeholder":"","explain":"KPI = Key Performance Indicator","termId":"KPI","sourcePage":8},{"id":"Q107","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"LTV의 영문 표현으로 알맞은 것은?","answer":"Life Time Value","accept":[],"options":["Life Time Value","Retention","Organic","Non Organic"],"input":false,"placeholder":"","explain":"LTV = Life Time Value","termId":"LTV","sourcePage":8},{"id":"Q108","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"PLC의 영문 표현으로 알맞은 것은?","answer":"Product Life Cycle","accept":[],"options":["Product Life Cycle","Key Performance Indicator","Break Even Point","Return On Investment"],"input":false,"placeholder":"","explain":"PLC = Product Life Cycle","termId":"PLC","sourcePage":9},{"id":"Q109","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"BEP의 영문 표현으로 알맞은 것은?","answer":"Break Even Point","accept":[],"options":["Break Even Point","Key Performance Indicator","Product Life Cycle","Return On Investment"],"input":false,"placeholder":"","explain":"BEP = Break Even Point","termId":"BEP","sourcePage":9},{"id":"Q110","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"ROI의 영문 표현으로 알맞은 것은?","answer":"Return On Investment","accept":[],"options":["Return On Investment","Key Performance Indicator","Product Life Cycle","Break Even Point"],"input":false,"placeholder":"","explain":"ROI = Return On Investment","termId":"ROI","sourcePage":9},{"id":"Q111","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"CAC / UAC의 영문 표현으로 알맞은 것은?","answer":"Customer Acquisition Cost / User Acquisition Cost","accept":[],"options":["Customer Acquisition Cost / User Acquisition Cost","Customer Retention Cost","User Acquisition","Concurrent User"],"input":false,"placeholder":"","explain":"CAC와 UAC는 유저 1인 확보 비용이며, UA는 비용이 아니라 유저 획득 활동을 뜻한다.","termId":"CACUAC","sourcePage":10},{"id":"Q112","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"UA의 영문 표현으로 알맞은 것은?","answer":"User Acquisition","accept":[],"options":["User Acquisition","Retention","Organic","Non Organic"],"input":false,"placeholder":"","explain":"UA = User Acquisition","termId":"UA","sourcePage":10},{"id":"Q113","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"CRC의 영문 표현으로 알맞은 것은?","answer":"Customer Retention Cost","accept":[],"options":["Customer Retention Cost","Retention","Organic","Non Organic"],"input":false,"placeholder":"","explain":"CRC = Customer Retention Cost","termId":"CRC","sourcePage":10},{"id":"Q114","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"RS의 영문 표현으로 알맞은 것은?","answer":"Revenue Share","accept":[],"options":["Revenue Share","License Fee","Minimum Guarantee","Memorandum of Understanding"],"input":false,"placeholder":"","explain":"RS = Revenue Share","termId":"RS","sourcePage":10},{"id":"Q115","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"LF의 영문 표현으로 알맞은 것은?","answer":"License Fee","accept":[],"options":["License Fee","Revenue Share","Minimum Guarantee","Memorandum of Understanding"],"input":false,"placeholder":"","explain":"LF = License Fee","termId":"LF","sourcePage":10},{"id":"Q116","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"MG의 영문 표현으로 알맞은 것은?","answer":"Minimum Guarantee","accept":[],"options":["Minimum Guarantee","Revenue Share","License Fee","Memorandum of Understanding"],"input":false,"placeholder":"","explain":"MG = Minimum Guarantee","termId":"MG","sourcePage":11},{"id":"Q117","kind":"객관식·영문/동의표현","difficulty":2,"prompt":"MOU의 영문 표현으로 알맞은 것은?","answer":"Memorandum of Understanding","accept":[],"options":["Memorandum of Understanding","Revenue Share","License Fee","Minimum Guarantee"],"input":false,"placeholder":"","explain":"MOU = Memorandum of Understanding","termId":"MOU","sourcePage":11},{"id":"Q118","kind":"개념 비교","difficulty":2,"prompt":"게임이 발생시킨 총매출을 뜻하는 수업 표현은?","answer":"Gross / Sales","accept":[],"options":["Gross / Sales","Net Sales","Net Gross","Revenue Share"],"input":false,"placeholder":"","explain":"Gross / Sales는 비용을 빼기 전 총매출이다.","termId":"GROSS","sourcePage":1},{"id":"Q119","kind":"개념 비교","difficulty":2,"prompt":"부가세와 마켓·플랫폼 수수료 등을 제한 뒤의 순매출을 뜻하는 표현은?","answer":"Net Sales / Net Gross","accept":["Net Sales","Net Gross"],"options":["Net Sales / Net Gross","Gross Sales","ARPPU","License Fee"],"input":false,"placeholder":"","explain":"수업에서는 Net Sales와 Net Gross를 순매출의 동의 표현으로 사용한다.","termId":"NET","sourcePage":1},{"id":"Q120","kind":"계산·직접입력","difficulty":3,"prompt":"Gross Sales가 100,000,000원이다. 수업 예시 방식대로 부가세 10%를 먼저 제한 뒤 마켓 수수료 30%를 제한하면 Net Sales는?","answer":"63,000,000원","accept":["63000000","6300만원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"100,000,000 × 0.90 × 0.70 = 63,000,000원.","termId":"NET","sourcePage":1},{"id":"Q121","kind":"계산·직접입력","difficulty":3,"prompt":"Gross Sales가 100,000,000원이다. 부가세 10%, 마켓 수수료 30%를 순서대로 제한한 금액에서 채널링 수수료 21%를 추가로 제한하면?","answer":"49,770,000원","accept":["49770000","4977만원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"100,000,000 × 0.90 × 0.70 × 0.79 = 49,770,000원.","termId":"NET","sourcePage":1},{"id":"Q122","kind":"계산·역산","difficulty":3,"prompt":"다른 공제 없이 플랫폼 수수료 30%만 제한한 Net Sales가 70,000,000원이라면 Gross Sales는?","answer":"100,000,000원","accept":["100000000","1억원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Gross Sales × 0.70 = 70,000,000이므로 Gross Sales는 100,000,000원.","termId":"NET","sourcePage":1},{"id":"Q123","kind":"상황 판단","difficulty":2,"prompt":"오늘 PU와 NPU가 모두 200명이다. 가장 알맞은 해석은?","answer":"오늘 결제한 200명 전원이 생애 첫 결제 유저다","accept":[],"options":["오늘 결제한 200명 전원이 생애 첫 결제 유저다","오늘 결제한 유저는 모두 기존 결제자다","이번 달 MPU가 200명이라는 뜻이다","PUR이 200%라는 뜻이다"],"input":false,"placeholder":"","explain":"NPU와 PU가 같으면 그날 결제 유저 전원이 신규 결제 유저다.","termId":"NPU","sourcePage":2},{"id":"Q124","kind":"상황 판단","difficulty":2,"prompt":"오늘 PU는 350명이고 NPU는 0명이다. 가장 알맞은 해석은?","answer":"오늘 결제한 350명은 모두 과거 결제 경험이 있는 유저다","accept":[],"options":["오늘 결제한 350명은 모두 과거 결제 경험이 있는 유저다","오늘 결제자가 한 명도 없다","오늘 신규 가입자가 350명이다","MPU가 0명이다"],"input":false,"placeholder":"","explain":"NPU가 0이면 첫 결제자는 없고 PU는 모두 기존 결제 경험자다.","termId":"NPU","sourcePage":2},{"id":"Q125","kind":"상황 판단","difficulty":3,"prompt":"한 유저가 30일 동안 매일 한 번씩 결제했다. 월간 집계에서 가장 알맞은 설명은?","answer":"일별 PU에는 매일 1명씩 잡히지만 MPU에는 1명으로 잡힌다","accept":[],"options":["일별 PU에는 매일 1명씩 잡히지만 MPU에는 1명으로 잡힌다","PU와 MPU 모두 30명이다","PU와 MPU 모두 1명이다","MPU는 30명이고 PU는 1명이다"],"input":false,"placeholder":"","explain":"PU는 일일 기준, MPU는 월간 중복 제거 기준이다.","termId":"MPU","sourcePage":2},{"id":"Q126","kind":"개념 구분","difficulty":2,"prompt":"결제하지 않은 유저를 수업에서 부른 표현은?","answer":"비과금/무과금 유저","accept":["비과금 유저","무과금 유저","non PU"],"options":["비과금/무과금 유저","NPU","MPU","BU"],"input":false,"placeholder":"","explain":"결제하지 않은 유저는 비과금 또는 무과금 유저로 통칭한다.","termId":"PU","sourcePage":2},{"id":"Q127","kind":"계산·직접입력","difficulty":2,"prompt":"DAU가 1,000명이고 PU가 50명이다. PUR은?","answer":"5%","accept":["5","0.05"],"options":[],"input":true,"placeholder":"정답 입력","explain":"PUR = 50 ÷ 1,000 × 100 = 5%.","termId":"PUR","sourcePage":3},{"id":"Q128","kind":"계산·역산","difficulty":3,"prompt":"DAU가 20,000명이고 PUR이 3%다. PU는 몇 명인가?","answer":"600명","accept":["600"],"options":[],"input":true,"placeholder":"정답 입력","explain":"PU = 20,000 × 0.03 = 600명.","termId":"PUR","sourcePage":3},{"id":"Q129","kind":"기준값","difficulty":2,"prompt":"수업에서 시장에 성공한 모바일 게임의 평균 PUR 범위로 제시한 것은?","answer":"약 3~5%","accept":["3~5%","3-5%"],"options":["약 3~5%","약 10~15%","약 20~30%","약 40~60%"],"input":false,"placeholder":"","explain":"수업에서는 성공한 모바일 게임의 평균 PUR을 약 3~5%로 설명한다.","termId":"PUR","sourcePage":3},{"id":"Q130","kind":"상황 판단","difficulty":3,"prompt":"PUR이 높지만 DAU가 매우 낮다. 수업 내용에 가장 가까운 판단은?","answer":"PUR이 높아도 높은 매출이 보장되는 것은 아니다","accept":[],"options":["PUR이 높아도 높은 매출이 보장되는 것은 아니다","PUR만 높으면 항상 매출이 높다","DAU는 매출과 무관하다","ARPPU는 반드시 0원이다"],"input":false,"placeholder":"","explain":"Sales = ARPPU × DAU × PUR이므로 DAU와 ARPPU도 함께 봐야 한다.","termId":"PUR","sourcePage":3},{"id":"Q131","kind":"계산·직접입력","difficulty":2,"prompt":"MAU가 20,000명이고 MPU가 3,000명이다. MPUR은?","answer":"15%","accept":["15","0.15"],"options":[],"input":true,"placeholder":"정답 입력","explain":"MPUR = 3,000 ÷ 20,000 × 100 = 15%.","termId":"MPUR","sourcePage":3},{"id":"Q132","kind":"계산·역산","difficulty":3,"prompt":"MAU가 80,000명이고 MPUR이 15%다. MPU는?","answer":"12,000명","accept":["12000"],"options":[],"input":true,"placeholder":"정답 입력","explain":"MPU = 80,000 × 0.15 = 12,000명.","termId":"MPUR","sourcePage":3},{"id":"Q133","kind":"기준값","difficulty":2,"prompt":"수업에서 성공한 모바일 게임의 평균 MPUR로 제시한 값은?","answer":"약 15%","accept":["15%","15"],"options":["약 15%","약 3%","약 50%","약 1%"],"input":false,"placeholder":"","explain":"수업에서는 성공한 모바일 게임의 평균 MPUR을 약 15%로 설명한다.","termId":"MPUR","sourcePage":3},{"id":"Q134","kind":"계산·직접입력","difficulty":2,"prompt":"오늘 Sales가 2,000,000원이고 PU가 40명이다. ARPPU는?","answer":"50,000원","accept":["50000","5만원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"ARPPU = 2,000,000 ÷ 40 = 50,000원.","termId":"ARPPU","sourcePage":4},{"id":"Q135","kind":"계산·역산","difficulty":3,"prompt":"ARPPU가 50,000원이고 PU가 400명이다. Sales는?","answer":"20,000,000원","accept":["20000000","2000만원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Sales = ARPPU × PU = 50,000 × 400 = 20,000,000원.","termId":"ARPPU","sourcePage":4},{"id":"Q136","kind":"기준값","difficulty":2,"prompt":"수업에서 70,000원 이상의 ARPPU를 보이는 게임을 주로 어떻게 분류했는가?","answer":"코어게임","accept":["코어 게임"],"options":["코어게임","캐주얼게임","웹페이지","비과금게임"],"input":false,"placeholder":"","explain":"TCG·SRPG·전략 등 코어게임은 70,000원 이상의 ARPPU를 보일 수 있다고 설명한다.","termId":"ARPPU","sourcePage":4},{"id":"Q137","kind":"기준값","difficulty":2,"prompt":"수업에서 캐주얼게임의 ARPPU로 제시한 수준은?","answer":"약 10,000원 전후","accept":["만원 전후","10000원"],"options":["약 10,000원 전후","약 70,000원 이상","약 1,000,000원","0원"],"input":false,"placeholder":"","explain":"수업에서는 캐주얼게임의 ARPPU를 만 원 전후로 설명한다.","termId":"ARPPU","sourcePage":4},{"id":"Q138","kind":"계산·직접입력","difficulty":2,"prompt":"오늘 Sales가 10,000,000원이고 DAU가 10,000명이다. ARPDAU는?","answer":"1,000원","accept":["1000"],"options":[],"input":true,"placeholder":"정답 입력","explain":"ARPDAU = 10,000,000 ÷ 10,000 = 1,000원.","termId":"ARPDAU","sourcePage":4},{"id":"Q139","kind":"계산·복합","difficulty":3,"prompt":"DAU 20,000명, PUR 3%, ARPPU 40,000원일 때 예상 일매출은?","answer":"24,000,000원","accept":["24000000","2400만원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Sales = DAU × PUR × ARPPU = 20,000 × 0.03 × 40,000 = 24,000,000원.","termId":"ARPDAU","sourcePage":4},{"id":"Q140","kind":"계산·월매출","difficulty":3,"prompt":"MAU 100,000명, MPUR 15%, ARPPU 40,000원일 때 예상 월매출은?","answer":"600,000,000원","accept":["600000000","6억원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"월 Sales = ARPPU × MAU × MPUR = 40,000 × 100,000 × 0.15 = 600,000,000원.","termId":"ARPDAU","sourcePage":4},{"id":"Q141","kind":"개념 비교","difficulty":3,"prompt":"PU는 늘었지만 ARPPU가 크게 하락했다. Sales 변화에 대한 가장 정확한 판단은?","answer":"PU 증가폭과 ARPPU 하락폭을 함께 알아야 한다","accept":[],"options":["PU 증가폭과 ARPPU 하락폭을 함께 알아야 한다","반드시 상승한다","반드시 하락한다","DAU만 알면 된다"],"input":false,"placeholder":"","explain":"Sales = PU × ARPPU이므로 두 변화의 크기를 함께 봐야 한다.","termId":"ARPDAU","sourcePage":4},{"id":"Q142","kind":"계산·직접입력","difficulty":2,"prompt":"D-0 기준 유저 1,000명 중 D+1에도 400명이 접속했다. D+1 Retention은?","answer":"40%","accept":["40","0.4"],"options":[],"input":true,"placeholder":"정답 입력","explain":"Retention = 400 ÷ 1,000 × 100 = 40%.","termId":"RET","sourcePage":6},{"id":"Q143","kind":"계산·직접입력","difficulty":3,"prompt":"신규 유저 2,500명 중 D+7에 425명이 남았다. D+7 Retention은?","answer":"17%","accept":["17","0.17"],"options":[],"input":true,"placeholder":"정답 입력","explain":"425 ÷ 2,500 × 100 = 17%.","termId":"RET","sourcePage":6},{"id":"Q144","kind":"기준값","difficulty":2,"prompt":"수업에서 성공과 실패를 판단하는 기준으로 자주 제시한 D+1, D+7 Retention 조합은?","answer":"D+1 50% 이상, D+7 20% 이상","accept":[],"options":["D+1 50% 이상, D+7 20% 이상","D+1 20%, D+7 50%","D+1 5%, D+7 3%","D+1 100%, D+7 100%"],"input":false,"placeholder":"","explain":"수업 기준으로 D+1 50% 이상, D+7 20% 이상을 중요한 기준값으로 설명한다.","termId":"RET","sourcePage":5},{"id":"Q145","kind":"상황 판단","difficulty":3,"prompt":"NRU는 충분하지만 D+1과 D+7에 대부분 이탈한다. 가장 먼저 개선해야 할 지표는?","answer":"Retention","accept":["잔존율"],"options":["Retention","ARPPU","RS","License Fee"],"input":false,"placeholder":"","explain":"유저가 남지 않으면 상품·이벤트·마케팅 효과를 이어 갈 수 없으므로 Retention이 우선이다.","termId":"RET","sourcePage":5},{"id":"Q146","kind":"개념 구분","difficulty":2,"prompt":"설치 후 한 달 시점의 초기 단계 마지노선으로 수업에서 언급한 Retention은?","answer":"D+30 또는 D+28","accept":["D+30","D+28"],"options":["D+30 또는 D+28","D+1만","D+2만","MCU"],"input":false,"placeholder":"","explain":"수업에서는 D+30을 초기 단계의 마지노선으로 보고, D+28을 쓰기도 한다고 설명한다.","termId":"RET","sourcePage":6},{"id":"Q147","kind":"장치 판단","difficulty":2,"prompt":"다음 중 수업에서 Retention을 높이기 위한 장치로 언급되지 않은 것은?","answer":"개발사와 퍼블리셔의 RS 비율","accept":[],"options":["개발사와 퍼블리셔의 RS 비율","출석부","접속시간 보상","요일던전"],"input":false,"placeholder":"","explain":"출석부·접속시간 보상·요일던전 등은 Retention 장치이며 RS는 계약 조건이다.","termId":"RET","sourcePage":5},{"id":"Q148","kind":"개념 비교","difficulty":2,"prompt":"친구 추천이나 검색으로 광고비 없이 들어온 유저는?","answer":"Organic","accept":["자연유입유저"],"options":["Organic","Non Organic","NPU","MCU"],"input":false,"placeholder":"","explain":"마케팅 없이 유저 본인의 의지로 들어온 유저는 Organic이다.","termId":"ORG","sourcePage":6},{"id":"Q149","kind":"개념 비교","difficulty":2,"prompt":"게임 배너나 리워드형 광고를 통해 다운로드한 유저는?","answer":"Non Organic","accept":["Non-Organic","비자연 유입유저"],"options":["Non Organic","Organic","MPU","UV"],"input":false,"placeholder":"","explain":"마케팅 활동을 통해 유입된 유저는 Non Organic이다.","termId":"NONORG","sourcePage":6},{"id":"Q150","kind":"상황 판단","difficulty":2,"prompt":"수업 내용에 따르면 일반적으로 모든 지표가 더 좋다고 설명한 유입 유형은?","answer":"Organic","accept":[],"options":["Organic","Non Organic","MCU","CRC"],"input":false,"placeholder":"","explain":"수업에서는 Organic 유저의 지표가 일반적으로 Non Organic보다 좋다고 설명한다.","termId":"ORG","sourcePage":6},{"id":"Q151","kind":"운영 판단","difficulty":2,"prompt":"현재 동시접속자를 바탕으로 가장 직접적으로 결정할 수 있는 것은?","answer":"필요한 게임 서버 규모와 비용","accept":[],"options":["필요한 게임 서버 규모와 비용","개발사와 퍼블리셔의 RS","MOU 법적 효력","NPU의 영문명"],"input":false,"placeholder":"","explain":"CU 예측은 필요한 서버 수와 서버 비용을 계산하는 데 사용한다.","termId":"CU","sourcePage":7},{"id":"Q152","kind":"개념 비교","difficulty":2,"prompt":"현재 CU가 6,500명이고 오늘 MCU가 9,200명이다. 가장 알맞은 설명은?","answer":"현재 동접은 오늘 최고 동접보다 2,700명 낮다","accept":[],"options":["현재 동접은 오늘 최고 동접보다 2,700명 낮다","현재 동접이 오늘 최고치다","오늘 DAU가 9,200명이다","오늘 NPU가 2,700명이다"],"input":false,"placeholder":"","explain":"CU는 현재 동접, MCU는 일정 기간의 최고 동접이다.","termId":"MCU","sourcePage":7},{"id":"Q153","kind":"기준값","difficulty":3,"prompt":"DAU가 100,000명일 때 수업에서 제시한 일 평균 동시접속자 범위는?","answer":"약 10,000~20,000명","accept":["10000~20000명"],"options":["약 10,000~20,000명","약 40,000~60,000명","약 1,000명","약 100,000명"],"input":false,"placeholder":"","explain":"일 평균 동시접속자는 보통 DAU의 10~20% 수준으로 제시됐다.","termId":"CU","sourcePage":7},{"id":"Q154","kind":"기준값","difficulty":3,"prompt":"DAU가 100,000명일 때 수업에서 제시한 최고 동시접속자 범위는?","answer":"약 40,000~60,000명","accept":["40000~60000명"],"options":["약 40,000~60,000명","약 10,000~20,000명","약 3,000~5,000명","약 100명"],"input":false,"placeholder":"","explain":"최고 동시접속자는 보통 DAU의 40~60% 수준으로 제시됐다.","termId":"MCU","sourcePage":7},{"id":"Q155","kind":"개념 비교","difficulty":2,"prompt":"웹페이지에서 주로 사용하며 한 번 이상 방문한 중복되지 않은 사용자를 세는 지표는?","answer":"UV","accept":["Unique Visit"],"options":["UV","MCU","MPUR","LF"],"input":false,"placeholder":"","explain":"UV는 순방문자 수로 DAU와 유사하지만 웹에서 주로 사용한다.","termId":"UV","sourcePage":7},{"id":"Q156","kind":"기준값","difficulty":2,"prompt":"수업에서 일반적인 모바일 RPG의 일 평균 플레이 시간으로 제시한 값은?","answer":"약 120분 전후","accept":["120분"],"options":["약 120분 전후","약 50분 전후","약 5분 전후","약 500분 전후"],"input":false,"placeholder":"","explain":"모바일 RPG는 일 평균 약 120분, 퍼즐게임은 약 50분으로 제시됐다.","termId":"TS","sourcePage":8},{"id":"Q157","kind":"기준값","difficulty":2,"prompt":"수업에서 일반적인 모바일 퍼즐게임의 일 평균 접속 횟수로 제시한 값은?","answer":"약 7~8회","accept":["7~8회","7-8회"],"options":["약 7~8회","약 1회","약 4~5회","약 20~30회"],"input":false,"placeholder":"","explain":"퍼즐게임은 일 평균 약 7~8회, RPG는 약 4~5회로 제시됐다.","termId":"TS","sourcePage":8},{"id":"Q158","kind":"개념 판단","difficulty":2,"prompt":"수업에서 게임사업의 대표 KPI 두 가지로 제시한 것은?","answer":"매출 또는 DAU","accept":["매출","DAU"],"options":["매출 또는 DAU","RS 또는 LF","MOU 또는 MG","CU 또는 TS만"],"input":false,"placeholder":"","explain":"게임사업의 대표 KPI는 매출 또는 압도적인 DAU로 설명했다.","termId":"KPI","sourcePage":8},{"id":"Q159","kind":"개념 판단","difficulty":2,"prompt":"수업에서 마케팅 KPI의 예로 제시한 것은?","answer":"NRU 또는 ROAS","accept":[],"options":["NRU 또는 ROAS","RS 또는 MOU","CU 또는 MCU","LF 또는 MG"],"input":false,"placeholder":"","explain":"마케팅 KPI의 예로 NRU 또는 ROAS가 언급됐다.","termId":"KPI","sourcePage":8},{"id":"Q160","kind":"개념 판단","difficulty":2,"prompt":"LTV 계산에 대해 수업에서 강조한 내용은?","answer":"회사마다 계산법이 달라 정형화된 공식이 없다","accept":[],"options":["회사마다 계산법이 달라 정형화된 공식이 없다","모든 회사가 Sales÷DAU만 사용한다","항상 Gross Sales와 같다","항상 CAC보다 작아야 한다"],"input":false,"placeholder":"","explain":"수업에서는 회사마다 LTV 계산법이 달라 정형화된 공식이 없다고 설명한다.","termId":"LTV","sourcePage":8},{"id":"Q161","kind":"비용 판단","difficulty":3,"prompt":"LTV가 30,000원, CAC가 10,000원, CRC가 8,000원이다. 수업의 비용 원칙에 따른 판단은?","answer":"CAC와 CRC의 합이 LTV보다 작아 조건을 만족한다","accept":[],"options":["CAC와 CRC의 합이 LTV보다 작아 조건을 만족한다","LTV보다 비용 합이 커 손실 구조다","CRC는 계산에서 제외한다","UA가 30,000원이라는 뜻이다"],"input":false,"placeholder":"","explain":"CAC+CRC=18,000원으로 LTV 30,000원보다 작다.","termId":"LTV","sourcePage":10},{"id":"Q162","kind":"비용 판단","difficulty":3,"prompt":"LTV가 18,000원, CAC가 12,000원, CRC가 9,000원이다. 가장 알맞은 판단은?","answer":"CAC와 CRC의 합이 LTV보다 커 비용 구조를 개선해야 한다","accept":[],"options":["CAC와 CRC의 합이 LTV보다 커 비용 구조를 개선해야 한다","조건을 충분히 만족한다","CRC가 높을수록 좋다","LTV는 비용이므로 낮을수록 좋다"],"input":false,"placeholder":"","explain":"CAC+CRC=21,000원으로 LTV 18,000원보다 크다.","termId":"LTV","sourcePage":10},{"id":"Q163","kind":"개념 구분","difficulty":2,"prompt":"수업에서 게임의 PLC를 크게 나눈 두 관점은?","answer":"게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기","accept":[],"options":["게임 내 콘텐츠 소비 속도와 게임이 흑자를 내는 전성기","PU와 NPU","CU와 UV","LF와 MG"],"input":false,"placeholder":"","explain":"게임 내 PLC와 게임 자체의 전성기 두 관점으로 설명한다.","termId":"PLC","sourcePage":9},{"id":"Q164","kind":"의사결정","difficulty":3,"prompt":"사업 담당자가 PLC를 예측해야 하는 이유로 가장 알맞은 것은?","answer":"예상매출과 마케팅비 등 지출 비용을 계산하기 위해","accept":[],"options":["예상매출과 마케팅비 등 지출 비용을 계산하기 위해","MOU에 법적 구속력을 주기 위해","NPU를 MCU로 바꾸기 위해","Gross를 Net보다 작게 만들기 위해"],"input":false,"placeholder":"","explain":"PLC를 예측해야 예상매출과 지출 가능한 비용을 계산할 수 있다.","termId":"PLC","sourcePage":9},{"id":"Q165","kind":"개념 판단","difficulty":2,"prompt":"BEP를 달성한 상태는?","answer":"현재까지 투입된 모든 비용과 매출이 같아진 상태","accept":[],"options":["현재까지 투입된 모든 비용과 매출이 같아진 상태","PUR이 100%가 된 상태","모든 유저가 NPU인 상태","MOU를 체결한 상태"],"input":false,"placeholder":"","explain":"BEP는 개발비·운영비·마케팅비 등 누적 비용과 매출이 같아지는 시점이다.","termId":"BEP","sourcePage":9},{"id":"Q166","kind":"상황 판단","difficulty":2,"prompt":"수업 내용에 따르면 초반에 많은 매출을 빠르게 발생시키면 BEP 포인트는 어떻게 되는가?","answer":"낮아진다","accept":[],"options":["낮아진다","높아진다","항상 동일하다","MCU와 같아진다"],"input":false,"placeholder":"","explain":"초반 매출이 빠르게 발생할수록 BEP 도달이 빨라져 BEP 포인트가 낮아진다고 설명한다.","termId":"BEP","sourcePage":9},{"id":"Q167","kind":"개념 판단","difficulty":2,"prompt":"ROI는 무엇을 나타내는가?","answer":"투자한 금액 대비 얻은 이익의 비율","accept":[],"options":["투자한 금액 대비 얻은 이익의 비율","일일 결제 유저 비율","최고 동시접속자 수","계약금"],"input":false,"placeholder":"","explain":"ROI는 Return On Investment, 투자수익률이다.","termId":"ROI","sourcePage":9},{"id":"Q168","kind":"계산·직접입력","difficulty":2,"prompt":"마케팅비 10,000,000원으로 신규 유저 5,000명을 확보했다. CAC는?","answer":"2,000원","accept":["2000"],"options":[],"input":true,"placeholder":"정답 입력","explain":"CAC = 10,000,000 ÷ 5,000 = 2,000원.","termId":"CACUAC","sourcePage":10},{"id":"Q169","kind":"계산·역산","difficulty":3,"prompt":"마케팅비 18,000,000원, CAC 3,000원이라면 확보한 신규 유저 수는?","answer":"6,000명","accept":["6000"],"options":[],"input":true,"placeholder":"정답 입력","explain":"신규 유저 수 = 18,000,000 ÷ 3,000 = 6,000명.","termId":"CACUAC","sourcePage":10},{"id":"Q170","kind":"개념 구분","difficulty":3,"prompt":"CAC/UAC와 UA의 차이에 대한 설명으로 알맞은 것은?","answer":"CAC/UAC는 유저 1인 확보 비용이고 UA는 유저 획득 활동이다","accept":[],"options":["CAC/UAC는 유저 1인 확보 비용이고 UA는 유저 획득 활동이다","세 용어는 모두 완전히 같은 비용 지표다","UA는 기존 유저 유지 비용이다","CAC는 수익 분배 비율이다"],"input":false,"placeholder":"","explain":"수업 페이지에서는 CAC·UAC를 비용으로, UA를 마케팅 유형인 User Acquisition으로 구분한다.","termId":"UA","sourcePage":10},{"id":"Q171","kind":"관계 판단","difficulty":2,"prompt":"수업 내용에 따르면 Retention이 높아질수록 CRC는 일반적으로 어떻게 되는가?","answer":"낮아진다","accept":[],"options":["낮아진다","높아진다","항상 0이 된다","LTV와 같아진다"],"input":false,"placeholder":"","explain":"유저 유지가 잘되면 1인 유지 비용인 CRC는 낮아지고, Retention이 낮으면 CRC가 높아진다.","termId":"CRC","sourcePage":10},{"id":"Q172","kind":"계산·직접입력","difficulty":3,"prompt":"Net Sales 50,000,000원을 개발사:퍼블리셔=4:6으로 나눈다. 개발사 몫은?","answer":"20,000,000원","accept":["20000000","2000만원"],"options":[],"input":true,"placeholder":"정답 입력","explain":"50,000,000 × 0.4 = 20,000,000원.","termId":"RS","sourcePage":10},{"id":"Q173","kind":"개념 비교","difficulty":2,"prompt":"퍼블리셔가 판권을 제공받으며 개발사에 지급하는 계약금은?","answer":"LF","accept":["License Fee"],"options":["LF","MG","RS","MOU"],"input":false,"placeholder":"","explain":"LF는 License Fee로 판권 제공 시 지급하는 계약금이다.","termId":"LF","sourcePage":10},{"id":"Q174","kind":"상황 판단","difficulty":3,"prompt":"개발사가 MG 3억 원을 받았다. 오픈 후 개발사 몫 RS 누적액이 아직 2억 원이라면 수업 기준 가장 알맞은 설명은?","answer":"MG가 아직 전부 회수되지 않아 추가 RS 정산을 받지 못한다","accept":[],"options":["MG가 아직 전부 회수되지 않아 추가 RS 정산을 받지 못한다","MG와 무관하게 즉시 2억 원을 추가 지급받는다","LF가 자동으로 3억 원 증가한다","MOU가 자동 해지된다"],"input":false,"placeholder":"","explain":"MG는 선지급금 성격이며 RS 금액이 MG를 초과하기 전까지 추가 수익을 받지 못하는 구조로 설명됐다.","termId":"MG","sourcePage":11},{"id":"Q175","kind":"개념 판단","difficulty":2,"prompt":"수업에서 MG를 이해하기 쉽게 비유한 표현은?","answer":"이자 없는 대출","accept":[],"options":["이자 없는 대출","투자수익률","마켓 수수료","자연유입"],"input":false,"placeholder":"","explain":"MG는 최소 수익 보장 선지급금으로, 수업에서는 이자 없는 대출에 비유했다.","termId":"MG","sourcePage":11},{"id":"Q176","kind":"개념 판단","difficulty":2,"prompt":"수업 기준 MOU의 법적 구속력에 대한 설명은?","answer":"법적 구속력이 없다","accept":[],"options":["법적 구속력이 없다","정식 계약과 완전히 동일하다","반드시 매출을 보장한다","RS를 4:6으로 고정한다"],"input":false,"placeholder":"","explain":"수업에서는 MOU를 계약 전 사전 협의·양해 문서로 설명하고 법적 구속력은 없다고 했다.","termId":"MOU","sourcePage":11},{"id":"Q177","kind":"상황 판단","difficulty":2,"prompt":"개발사와 퍼블리셔가 정식 계약 전 공유 정보와 아이디어를 제3자에게 노출하지 않기로 약속하는 문서는?","answer":"MOU","accept":["양해각서"],"options":["MOU","ARPPU","MCU","BEP"],"input":false,"placeholder":"","explain":"MOU는 정식 계약 전 거래·정보 보호 등에 대한 사전 협의 문서다.","termId":"MOU","sourcePage":11}];
const ENEMIES=[{"name": "이탈 슬라임", "emoji": "🟢", "desc": "유저를 게임 밖으로 밀어낸다."}, {"name": "과금 미믹", "emoji": "🎁", "desc": "PUR과 ARPPU를 뒤섞어 혼란을 준다."}, {"name": "동접 골렘", "emoji": "🗿", "desc": "CU와 MCU를 구분하지 못하게 만든다."}, {"name": "수수료 유령", "emoji": "👻", "desc": "Gross와 Net을 몰래 바꿔 놓는다."}, {"name": "KPI 드래곤", "emoji": "🐉", "desc": "모든 지표를 시험하는 최종 보스다."}];
const ACHIEVEMENTS={"firstWin": {"name": "첫 던전 클리어", "icon": "🏅", "desc": "처음으로 전투에서 승리"}, "combo5": {"name": "집중력 폭발", "icon": "🔥", "desc": "5콤보 달성"}, "perfect": {"name": "무결점 분석가", "icon": "💎", "desc": "한 판을 오답 없이 클리어"}, "scholar": {"name": "도감 수집가", "icon": "📚", "desc": "학습실에서 카드 20개 열람"}, "boss": {"name": "KPI 정복자", "icon": "🐲", "desc": "보스전 승리"}, "level5": {"name": "주니어 게임기획자", "icon": "🎓", "desc": "레벨 5 달성"}};


const SafeStore={
 get(key,fallback=null){
  try{
   const value=window.localStorage.getItem(key);
   return value===null?fallback:value;
  }catch(e){return fallback}
 },
 set(key,value){
  try{window.localStorage.setItem(key,value);return true}
  catch(e){return false}
 },
 remove(key){
  try{window.localStorage.removeItem(key);return true}
  catch(e){return false}
 }
};

/* 외부 음원 없이 브라우저가 직접 만드는 오리지널 칩튠 */
const AudioEngine={
 ctx:null,master:null,musicGain:null,sfxGain:null,
 enabled:true,volume:.45,timer:null,step:0,mode:"home",
 init(){
  if(this.ctx)return true;
  try{
   const AC=window.AudioContext||window.webkitAudioContext;
   if(!AC)return false;
   this.ctx=new AC();
   this.master=this.ctx.createGain();
   this.musicGain=this.ctx.createGain();
   this.sfxGain=this.ctx.createGain();
   this.musicGain.gain.value=.18;
   this.sfxGain.gain.value=.55;
   this.musicGain.connect(this.master);
   this.sfxGain.connect(this.master);
   this.master.connect(this.ctx.destination);
   this.master.gain.value=this.enabled?this.volume:0;
   return true;
  }catch(e){this.ctx=null;return false}
 },
 resume(){
  try{
   if(!this.init())return;
   if(this.ctx.state==="suspended")this.ctx.resume().catch(()=>{});
  }catch(e){}
 },
 setEnabled(value){
  this.enabled=value;
  SafeStore.set("gameMetricsSoundEnabled",value?"1":"0");
  try{
   this.resume();
   if(this.master&&this.ctx)this.master.gain.setTargetAtTime(value?this.volume:0,this.ctx.currentTime,.03);
  }catch(e){}
  const button=document.getElementById("soundToggle");
  if(button)button.textContent=value?"🔊":"🔇";
  if(value)this.startMusic(this.mode);else this.stopMusic();
 },
 setVolume(value){
  this.volume=Math.max(0,Math.min(1,value));
  SafeStore.set("gameMetricsSoundVolume",String(this.volume));
  try{
   if(this.master&&this.ctx)this.master.gain.setTargetAtTime(this.enabled?this.volume:0,this.ctx.currentTime,.03);
  }catch(e){}
 },
 tone(freq,dur=.1,type="square",gain=.1,delay=0,target="sfx"){
  try{
   if(!this.enabled)return;
   this.resume();
   if(!this.ctx)return;
   const now=this.ctx.currentTime+delay;
   const osc=this.ctx.createOscillator();
   const amp=this.ctx.createGain();
   osc.type=type;
   osc.frequency.setValueAtTime(freq,now);
   amp.gain.setValueAtTime(.0001,now);
   amp.gain.exponentialRampToValueAtTime(Math.max(.0002,gain),now+.008);
   amp.gain.exponentialRampToValueAtTime(.0001,now+dur);
   osc.connect(amp);
   amp.connect(target==="music"?this.musicGain:this.sfxGain);
   osc.start(now);
   osc.stop(now+dur+.03);
  }catch(e){}
 },
 noise(dur=.07,gain=.09){
  try{
   if(!this.enabled)return;
   this.resume();
   if(!this.ctx)return;
   const length=Math.floor(this.ctx.sampleRate*dur);
   const buffer=this.ctx.createBuffer(1,length,this.ctx.sampleRate);
   const data=buffer.getChannelData(0);
   for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
   const source=this.ctx.createBufferSource();
   const amp=this.ctx.createGain();
   source.buffer=buffer;
   amp.gain.value=gain;
   source.connect(amp);
   amp.connect(this.sfxGain);
   source.start();
  }catch(e){}
 },
 click(){this.tone(520,.04,"square",.05)},
 correct(){
  this.tone(523.25,.08,"square",.10);
  this.tone(659.25,.08,"square",.09,.07);
  this.tone(783.99,.13,"square",.08,.14);
 },
 wrong(){
  this.tone(220,.13,"sawtooth",.09);
  this.tone(164.81,.2,"sawtooth",.08,.1);
 },
 attack(){this.noise(.05,.08);this.tone(150,.1,"square",.08)},
 hurt(){this.noise(.1,.1);this.tone(120,.17,"sawtooth",.09)},
 victory(){[523.25,659.25,783.99,1046.5].forEach((f,i)=>this.tone(f,.16,"square",.09,i*.1))},
 defeat(){[392,329.63,261.63,196].forEach((f,i)=>this.tone(f,.2,"triangle",.09,i*.13))},
 levelUp(){[523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>this.tone(f,.14,"square",.08,i*.08))},
 stopMusic(){
  if(this.timer){clearInterval(this.timer);this.timer=null}
 },
 startMusic(mode="home"){
  this.mode=mode;
  if(!this.enabled)return;
  this.resume();
  if(!this.ctx)return;
  this.stopMusic();
  this.step=0;
  const sets={
   home:[261.63,392,329.63,440,349.23,523.25,392,329.63],
   battle:[261.63,329.63,392,523.25,392,329.63,293.66,392],
   boss:[146.83,174.61,220,146.83,196,233.08,174.61,130.81]
  };
  const seq=sets[mode]||sets.battle;
  const interval=mode==="boss"?220:310;
  const play=()=>{
   const i=this.step%seq.length;
   const f=seq[i];
   this.tone(f,mode==="boss" ? 0.16 : 0.22,mode==="boss" ? "sawtooth" : "triangle",mode==="boss" ? 0.04 : 0.03,0,"music");
   if(i%2===0)this.tone(f/2,.1,"square",.018,0,"music");
   this.step++;
  };
  play();
  this.timer=setInterval(play,interval);
 }
};

const $=id=>document.getElementById(id);
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const normalize=s=>String(s == null ? "" : s)
 .normalize("NFKC")
 .trim()
 .toLocaleUpperCase("en-US")
 .replace(/[^0-9A-Z가-힣]/g,"");
const SAVE_KEY="gameMetricsGuildV2";
const defaultPlayer={level:1,xp:0,gold:0,wins:0,bossWins:0,bestCombo:0,studyViews:0,mastery:{},mistakes:[],achievements:[],lastMode:"adventure"};
let player=loadPlayer();
let battle=null,flashIndex=0,flashFlipped=false,studyTab="glossary";
AudioEngine.enabled=SafeStore.get("gameMetricsSoundEnabled","1")!=="0";
AudioEngine.volume=Number(SafeStore.get("gameMetricsSoundVolume",".45")||".45");

function loadPlayer(){
 try{
  const saved=JSON.parse(SafeStore.get(SAVE_KEY,"{}")||"{}");
  if(saved.mastery&&saved.mastery.CAC&&!saved.mastery.CACUAC){
   saved.mastery.CACUAC=saved.mastery.CAC;delete saved.mastery.CAC;
  }
  if(Array.isArray(saved.mistakes)){
   saved.mistakes=[...new Set(saved.mistakes.map(id=>id==="CAC"?"CACUAC":id))];
  }
  const merged={...defaultPlayer,...saved};
  if(!merged.mastery||typeof merged.mastery!=="object"||Array.isArray(merged.mastery))merged.mastery={};
  if(!Array.isArray(merged.mistakes))merged.mistakes=[];
  if(!Array.isArray(merged.achievements))merged.achievements=[];
  if(!Number.isFinite(Number(merged.level))||Number(merged.level)<1)merged.level=1;
  if(!Number.isFinite(Number(merged.xp))||Number(merged.xp)<0)merged.xp=0;
  if(!Number.isFinite(Number(merged.gold))||Number(merged.gold)<0)merged.gold=0;
  return merged;
 }catch(e){return {...defaultPlayer,mastery:{},mistakes:[],achievements:[]}}
}
function savePlayer(){SafeStore.set(SAVE_KEY,JSON.stringify(player));updateHeader()}
function xpNeed(level){return 100+level*40}
function rankFor(level){
 if(level>=10)return["수석 게임사업가","🧙‍♀️"];
 if(level>=7)return["시니어 지표 분석가","🧝‍♂️"];
 if(level>=5)return["주니어 게임기획자","🧑‍💻"];
 if(level>=3)return["견습 지표 분석가","🧙"];
 return["인턴 분석가","🧙‍♂️"];
}
function gainXp(amount){
 let leveled=false;player.xp+=amount;
 while(player.xp>=xpNeed(player.level)){player.xp-=xpNeed(player.level);player.level++;leveled=true}
 if(player.level>=5)unlock("level5");
 return leveled;
}
function unlock(id,newList=[]){
 if(!player.achievements.includes(id)){player.achievements.push(id);newList.push(id);return true}return false
}
function updateHeader(){
 try{
  const need=xpNeed(player.level);
  if($("miniLevel"))$("miniLevel").textContent=player.level;
  if($("miniGold"))$("miniGold").textContent=player.gold;
  if($("miniXp"))$("miniXp").style.width=`${player.xp/need*100}%`;
  const rankInfo=rankFor(player.level),rank=rankInfo[0],av=rankInfo[1];
  if($("rankName"))$("rankName").textContent=rank;
  if($("homeAvatar"))$("homeAvatar").textContent=av;
  const mastered=TERMS.filter(t=>masteryPercent(t.id)>=70).length;
  if($("homeProgress"))$("homeProgress").textContent=`도감 숙련도 ${Math.round(mastered/TERMS.length*100)}%`;
  if($("wrongCount"))$("wrongCount").textContent=`오답 ${player.mistakes.length}개`;
 }catch(e){}
}
function masteryRecord(id){return player.mastery[id]||{correct:0,wrong:0}}
function masteryPercent(id){const r=masteryRecord(id),n=r.correct+r.wrong;if(!n)return 0;return Math.round(r.correct/n*100)}
function masteryLabel(id){
 const r=masteryRecord(id),n=r.correct+r.wrong;
 return n?`숙련도 ${masteryPercent(id)}% · ${r.correct}/${n} 정답`:"미학습";
}
function recordAnswer(id,correct){
 const r=masteryRecord(id);correct?r.correct++:r.wrong++;player.mastery[id]=r;
 if(correct){if(player.mistakes.includes(id)&&r.correct>=r.wrong+1)player.mistakes=player.mistakes.filter(x=>x!==id)}
 else if(!player.mistakes.includes(id))player.mistakes.push(id);
}
function showScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");
 try{window.scrollTo({top:0,behavior:"smooth"})}catch(e){try{window.scrollTo(0,0)}catch(ignore){}}
 if(id==="home"){updateHeader();AudioEngine.startMusic("home")}
 else if(id==="study"||id==="profile")AudioEngine.startMusic("home");
}
document.querySelectorAll("[data-home]").forEach(b=>b.onclick=()=>showScreen("home"));

function termById(id){return TERMS.find(t=>t.id===id)}

const CALC_VARIANT_IDS=new Set(["Q120","Q121","Q122","Q127","Q128","Q131","Q132","Q134","Q135","Q138","Q139","Q140","Q142","Q143","Q168","Q169","Q172"]);
function randomItem(list){return list[Math.floor(Math.random()*list.length)]}
function tidyNumber(value){
 const rounded=Math.round(value*100)/100;
 return Number.isInteger(rounded)?String(rounded):String(rounded).replace(/0+$/," ").trim().replace(/\.$/,"");
}
function numberWithCommas(value){return Number(value).toLocaleString("ko-KR")}
function moneyAcceptFromMan(man){
 const won=Math.round(man*10000);
 return [tidyNumber(man),`${tidyNumber(man)}만원`,String(won),`${numberWithCommas(won)}원`];
}
function calculationVariant(original){
 const q={...original,accept:(original.accept||[]).slice(),options:(original.options||[]).slice(),calculator:true,dynamic:true};
 const id=q.id;
 if(id==="Q120"){
  const gross=randomItem([100,200,300,400,500,600,800,1000]),net=gross*.9*.7;
  q.prompt=`Gross Sales가 ${numberWithCommas(gross)}만원이다. 부가세 10%를 먼저 제한 뒤 마켓 수수료 30%를 제한하면 Net Sales는?`;
  q.answer=`${tidyNumber(net)}만원`;q.accept=moneyAcceptFromMan(net);q.explain=`${gross} × 0.9 × 0.7 = ${tidyNumber(net)}만원.`;
 }else if(id==="Q121"){
  const gross=randomItem([1000,2000,3000]),net=gross*.9*.7*.79;
  q.prompt=`Gross Sales가 ${numberWithCommas(gross)}만원이다. 부가세 10%와 마켓 수수료 30%를 순서대로 제한한 뒤 채널링 수수료 21%를 추가로 제한하면?`;
  q.answer=`${tidyNumber(net)}만원`;q.accept=moneyAcceptFromMan(net);q.explain=`${gross} × 0.9 × 0.7 × 0.79 = ${tidyNumber(net)}만원.`;
 }else if(id==="Q122"){
  const gross=randomItem([100,200,300,400,500,800,1000]),net=gross*.7;
  q.prompt=`다른 공제 없이 플랫폼 수수료 30%만 제한한 Net Sales가 ${tidyNumber(net)}만원이라면 Gross Sales는?`;
  q.answer=`${gross}만원`;q.accept=moneyAcceptFromMan(gross);q.explain=`Gross = ${tidyNumber(net)} ÷ 0.7 = ${gross}만원.`;
 }else if(id==="Q127"||id==="Q128"){
  const dau=randomItem([100,200,300,400,500,800,1000]),rate=randomItem([2,3,4,5,10,15,20]),pu=dau*rate/100;
  if(id==="Q127"){
   q.prompt=`DAU가 ${numberWithCommas(dau)}명이고 PU가 ${numberWithCommas(pu)}명이다. PUR은?`;q.answer=`${rate}%`;q.accept=[String(rate),String(rate/100),`${rate}%`];q.explain=`${pu} ÷ ${dau} × 100 = ${rate}%.`;
  }else{
   q.prompt=`DAU가 ${numberWithCommas(dau)}명이고 PUR이 ${rate}%다. PU는 몇 명인가?`;q.answer=`${numberWithCommas(pu)}명`;q.accept=[String(pu),`${pu}명`];q.explain=`${dau} × ${rate/100} = ${pu}명.`;
  }
 }else if(id==="Q131"||id==="Q132"){
  const mau=randomItem([500,1000,2000,3000,4000]),rate=randomItem([5,10,15,20]),mpu=mau*rate/100;
  if(id==="Q131"){
   q.prompt=`MAU가 ${numberWithCommas(mau)}명이고 MPU가 ${numberWithCommas(mpu)}명이다. MPUR은?`;q.answer=`${rate}%`;q.accept=[String(rate),String(rate/100),`${rate}%`];q.explain=`${mpu} ÷ ${mau} × 100 = ${rate}%.`;
  }else{
   q.prompt=`MAU가 ${numberWithCommas(mau)}명이고 MPUR이 ${rate}%다. MPU는?`;q.answer=`${numberWithCommas(mpu)}명`;q.accept=[String(mpu),`${mpu}명`];q.explain=`${mau} × ${rate/100} = ${mpu}명.`;
  }
 }else if(id==="Q134"||id==="Q135"){
  const arppu=randomItem([1,2,3,4,5]),pu=randomItem([10,20,25,30,40]),sales=arppu*pu;
  if(id==="Q134"){
   q.prompt=`오늘 Sales가 ${numberWithCommas(sales)}만원이고 PU가 ${pu}명이다. ARPPU는?`;q.answer=`${arppu}만원`;q.accept=moneyAcceptFromMan(arppu);q.explain=`${sales} ÷ ${pu} = ${arppu}만원.`;
  }else{
   q.prompt=`ARPPU가 ${arppu}만원이고 PU가 ${pu}명이다. Sales는?`;q.answer=`${numberWithCommas(sales)}만원`;q.accept=moneyAcceptFromMan(sales);q.explain=`${arppu} × ${pu} = ${sales}만원.`;
  }
 }else if(id==="Q138"){
  const dau=randomItem([100,200,500,1000]),arpdau=randomItem([500,1000,1500,2000]),salesWon=dau*arpdau,salesMan=salesWon/10000;
  q.prompt=`오늘 Sales가 ${tidyNumber(salesMan)}만원이고 DAU가 ${numberWithCommas(dau)}명이다. ARPDAU는?`;q.answer=`${numberWithCommas(arpdau)}원`;q.accept=[String(arpdau),`${arpdau}원`,`${numberWithCommas(arpdau)}원`];q.explain=`${numberWithCommas(salesWon)} ÷ ${dau} = ${numberWithCommas(arpdau)}원.`;
 }else if(id==="Q139"){
  const dau=randomItem([100,200,500,1000]),rate=randomItem([2,4,5,10]),arppu=randomItem([1,2,3,4]),pu=dau*rate/100,sales=pu*arppu;
  q.prompt=`DAU ${numberWithCommas(dau)}명, PUR ${rate}%, ARPPU ${arppu}만원일 때 예상 일매출은?`;q.answer=`${tidyNumber(sales)}만원`;q.accept=moneyAcceptFromMan(sales);q.explain=`${dau} × ${rate/100} × ${arppu} = ${tidyNumber(sales)}만원.`;
 }else if(id==="Q140"){
  const mau=randomItem([500,1000,2000,3000]),rate=randomItem([5,10,15,20]),arppu=randomItem([1,2,3]),mpu=mau*rate/100,sales=mpu*arppu;
  q.prompt=`MAU ${numberWithCommas(mau)}명, MPUR ${rate}%, ARPPU ${arppu}만원일 때 예상 월매출은?`;q.answer=`${numberWithCommas(sales)}만원`;q.accept=moneyAcceptFromMan(sales);q.explain=`${mau} × ${rate/100} × ${arppu} = ${numberWithCommas(sales)}만원.`;
 }else if(id==="Q142"||id==="Q143"){
  const base=randomItem([100,200,500,1000]),rate=randomItem(id==="Q142"?[20,30,40,50,60]:[10,15,20,25,30]),remain=base*rate/100;
  const day=id==="Q142"?"D+1":"D+7";
  q.prompt=`D-0 기준 유저 ${numberWithCommas(base)}명 중 ${day}에도 ${numberWithCommas(remain)}명이 접속했다. ${day} Retention은?`;q.answer=`${rate}%`;q.accept=[String(rate),String(rate/100),`${rate}%`];q.explain=`${remain} ÷ ${base} × 100 = ${rate}%.`;
 }else if(id==="Q168"||id==="Q169"){
  const users=randomItem([100,200,300,400,500]),cac=randomItem([1000,2000,3000,4000]),costWon=users*cac,costMan=costWon/10000;
  if(id==="Q168"){
   q.prompt=`마케팅비 ${tidyNumber(costMan)}만원으로 신규 유저 ${users}명을 확보했다. CAC는?`;q.answer=`${numberWithCommas(cac)}원`;q.accept=[String(cac),`${cac}원`,`${numberWithCommas(cac)}원`];q.explain=`${numberWithCommas(costWon)} ÷ ${users} = ${numberWithCommas(cac)}원.`;
  }else{
   q.prompt=`마케팅비 ${tidyNumber(costMan)}만원, CAC ${numberWithCommas(cac)}원이라면 확보한 신규 유저 수는?`;q.answer=`${users}명`;q.accept=[String(users),`${users}명`];q.explain=`${numberWithCommas(costWon)} ÷ ${numberWithCommas(cac)} = ${users}명.`;
  }
 }else if(id==="Q172"){
  const net=randomItem([50,100,200,300,500]),share=randomItem([30,40,50]),developer=net*share/100;
  q.prompt=`Net Sales ${net}만원을 개발사:퍼블리셔=${share}:${100-share}으로 나눈다. 개발사 몫은?`;q.answer=`${tidyNumber(developer)}만원`;q.accept=moneyAcceptFromMan(developer);q.explain=`${net} × ${share/100} = ${tidyNumber(developer)}만원.`;
 }
 q.kind=q.kind.replace("계산·","계산·랜덤 ");
 q.placeholder="숫자와 단위를 입력";
 return q;
}

function questionCopy(q){
 const source=CALC_VARIANT_IDS.has(q.id)?calculationVariant(q):q;
 return {
  id:source.id,kind:source.kind,difficulty:source.difficulty,prompt:source.prompt,answer:source.answer,
  accept:(source.accept||[]).slice(),options:(source.options||[]).slice(),input:source.input,
  placeholder:source.placeholder||"정답 입력",explain:source.explain,termId:source.termId,
  sourcePage:source.sourcePage,calculator:!!source.calculator,dynamic:!!source.dynamic
 };
}
function pickDiverse(pool,count,usedIds){
 const result=[],seenTopics=new Set(),used=usedIds||new Set();
 const shuffled=shuffle(pool.filter(q=>!used.has(q.id)));
 for(const q of shuffled){
  if(result.length>=count)break;
  if(!seenTopics.has(q.termId)){result.push(questionCopy(q));seenTopics.add(q.termId);used.add(q.id)}
 }
 if(result.length<count){
  for(const q of shuffled){
   if(result.length>=count)break;
   if(!used.has(q.id)){result.push(questionCopy(q));used.add(q.id)}
  }
 }
 return result;
}
function buildQuestions(mode){
 const used=new Set(),out=[];
 const add=(pool,count)=>out.push(...pickDiverse(pool,count,used));
 if(mode==="quick"){
  add(QUESTION_BANK.filter(q=>q.difficulty===1),10);
 }else if(mode==="adventure"){
  add(QUESTION_BANK.filter(q=>q.difficulty===1),3);
  add(QUESTION_BANK.filter(q=>q.difficulty===2),5);
  add(QUESTION_BANK.filter(q=>q.difficulty===3),2);
 }else if(mode==="boss"){
  add(QUESTION_BANK.filter(q=>q.difficulty===2),4);
  add(QUESTION_BANK.filter(q=>q.difficulty===3),8);
 }else if(mode==="advanced"){
  add(QUESTION_BANK.filter(q=>q.difficulty===3),15);
 }else if(mode==="wrong"){
  const mistakeSet=new Set(player.mistakes);
  const pool=QUESTION_BANK.filter(q=>mistakeSet.has(q.termId));
  add(pool,Math.min(12,Math.max(8,pool.length)));
 }
 return shuffle(out);
}
function startBattle(mode){
 player.lastMode=mode;
 const enemy=(mode==="boss"||mode==="advanced")?ENEMIES[4]:shuffle(ENEMIES.slice(0,4))[0];
 const questions=buildQuestions(mode);
 const maxEnemy=(mode==="boss"||mode==="advanced")?questions.length*38:questions.length*34;
 const playerMaxHp=(mode==="advanced"||mode==="boss")?160:100;
 battle={mode,enemy,questions,index:0,playerHp:playerMaxHp,maxPlayer:playerMaxHp,enemyHp:maxEnemy,maxEnemy,combo:0,score:0,correct:0,wrong:0,answered:false};
 $("playerFace").textContent=rankFor(player.level)[1];$("enemyFace").textContent=enemy.emoji;$("enemyName").textContent=enemy.name;
 $("battleTotal").textContent=battle.questions.length;showScreen("battle");AudioEngine.startMusic((mode==="boss"||mode==="advanced")?"boss":"battle");renderBattle();
}
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>startBattle(b.dataset.mode));
$("wrongDungeon").onclick=()=>{
 if(!player.mistakes.length){alert("아직 저장된 오답이 없어. 먼저 던전을 플레이해 봐!");return}
 startBattle("wrong")
};
$("quitBattle").onclick=()=>{if(confirm("전투를 포기하고 길드로 돌아갈까?"))showScreen("home")};

let calculatorExpression="";
let calculatorResult="";
function resetCalculator(){
 calculatorExpression="";calculatorResult="";
 if($("calcDisplay"))$("calcDisplay").value="";
 if($("calcHistory"))$("calcHistory").textContent="";
}
function calculatorEvaluate(expression){
 let safe=String(expression||"").replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-");
 safe=safe.replace(/(\d+(?:\.\d+)?)%/g,"($1/100)");
 if(!safe||!/^[0-9+\-*/().\s]+$/.test(safe))throw new Error("invalid expression");
 const value=Function('"use strict";return ('+safe+')')();
 if(!Number.isFinite(value))throw new Error("invalid result");
 return Math.round(value*1000000)/1000000;
}
function calculatorPress(key){
 if(key==="C"){resetCalculator();return}
 if(key==="BACK"){
  calculatorExpression=calculatorExpression.slice(0,-1);calculatorResult="";
 }else if(key==="="){
  try{
   const before=calculatorExpression;
   calculatorResult=String(calculatorEvaluate(calculatorExpression));
   $("calcHistory").textContent=before+" =";
   calculatorExpression=calculatorResult;
  }catch(e){calculatorResult="오류";$("calcHistory").textContent="식을 다시 확인해"}
 }else{
  if(calculatorResult&&calculatorResult!=="오류"&&!/[+−×÷]/.test(key))calculatorExpression="";
  calculatorResult="";calculatorExpression+=key;
 }
 $("calcDisplay").value=calculatorResult||calculatorExpression;
}
document.querySelectorAll("[data-calc]").forEach(button=>button.onclick=()=>calculatorPress(button.dataset.calc));
if($("copyCalcResult"))$("copyCalcResult").onclick=()=>{
 const target=$("answerInput"),value=$("calcDisplay").value;
 if(!target||!value||value==="오류")return;
 target.value=value;target.focus();
};

function renderBattle(){
 const q=battle.questions[battle.index];battle.answered=false;
 $("playerHpBar").style.width=`${battle.playerHp/battle.maxPlayer*100}%`;$("enemyHpBar").style.width=`${battle.enemyHp/battle.maxEnemy*100}%`;
 $("playerHpText").textContent=`${battle.playerHp}/${battle.maxPlayer}`;$("enemyHpText").textContent=`${battle.enemyHp}/${battle.maxEnemy}`;
 $("battleCombo").textContent=battle.combo;$("battleNumber").textContent=battle.index+1;$("battleScore").textContent=battle.score;
 $("qType").textContent=(battle.mode==="advanced"?"심화 시험 · ":"")+q.kind;$("qText").textContent=q.prompt;$("feedback").innerHTML="";$("nextQuestion").style.display="none";
 const showCalc=!!q.calculator;
 if($("copyCalcResult"))$("copyCalcResult").disabled=false;
 $("calculatorPanel").hidden=!showCalc;$("solveGrid").classList.toggle("with-calculator",showCalc);resetCalculator();
 if($("calcUnitHint"))$("calcUnitHint").textContent=showCalc?"문제 단위 확인":"숫자를 계산해 봐";
 const area=$("answerArea");area.innerHTML="";
 if(q.input){
  const wrap=document.createElement("div");wrap.className="input-answer";
  const inp=document.createElement("input");inp.id="answerInput";inp.inputMode=q.calculator?"decimal":"text";inp.placeholder=q.placeholder||"정답 입력";inp.autocomplete="off";inp.autocapitalize="off";inp.spellcheck=false;
  const btn=document.createElement("button");btn.className="btn primary";btn.textContent="공격";btn.onclick=()=>submitAnswer(inp.value,btn);
  inp.onkeydown=e=>{if(e.key==="Enter")btn.click()};wrap.append(inp,btn);area.append(wrap);setTimeout(()=>inp.focus(),50)
 }else{
  const choices=document.createElement("div");choices.className="choices";
  shuffle(q.options).forEach(opt=>{const b=document.createElement("button");b.className="choice";b.textContent=opt;b.onclick=()=>submitAnswer(opt,b);choices.append(b)});
  area.append(choices)
 }
}
function answerUnit(value){
 const text=String(value == null ? "" : value).replace(/\s/g,"").toLowerCase();
 if(/%p|퍼센트포인트|%포인트/.test(text))return "PERCENT_POINT";
 if(/%|퍼센트/.test(text))return "PERCENT";
 if(/만원/.test(text))return "MANWON";
 if(/원/.test(text))return "WON";
 if(/명/.test(text))return "PERSON";
 return "";
}
function isCorrectAnswer(q,value){
 const accepted=[q.answer,...(q.accept||[])];
 const valueUnit=answerUnit(value),expectedUnit=answerUnit(q.answer);
 if(valueUnit&&expectedUnit&&valueUnit!==expectedUnit){
  const explicitEquivalent=accepted.some(answer=>answerUnit(answer)===valueUnit&&normalize(value)===normalize(answer));
  if(!explicitEquivalent)return false;
 }
 if(accepted.some(answer=>normalize(value)===normalize(answer)))return true;
 const numericValue=String(value == null ? "" : value).replace(/,/g,"").match(/-?\d+(?:\.\d+)?/);
 if(!numericValue)return false;
 return accepted.some(answer=>{
  const numericAnswer=String(answer == null ? "" : answer).replace(/,/g,"").match(/-?\d+(?:\.\d+)?/);
  if(!numericAnswer)return false;
  const a=Number(numericValue[0]),b=Number(numericAnswer[0]);
  if(!Number.isFinite(a)||!Number.isFinite(b))return false;
  if(Math.abs(a-b)<1e-9)return true;
  const answerHasPercent=String(answer).includes("%");
  const valueHasPercent=String(value).includes("%");
  return answerHasPercent!==valueHasPercent && (Math.abs(a*100-b)<1e-9||Math.abs(a-b*100)<1e-9);
 });
}
function submitAnswer(value,button){
 if(battle.answered)return;battle.answered=true;
 const q=battle.questions[battle.index];
 const correct=isCorrectAnswer(q,value);
 document.querySelectorAll("#answerArea button,#answerArea input").forEach(x=>x.disabled=true);if($("copyCalcResult"))$("copyCalcResult").disabled=true;
 if(correct){
  AudioEngine.correct();setTimeout(()=>AudioEngine.attack(),120);
  battle.combo++;battle.correct++;const dmg=22+Math.min(16,battle.combo*3);battle.enemyHp=clamp(battle.enemyHp-dmg,0,battle.maxEnemy);
  battle.score+=100+battle.combo*20;if(button)button.classList.add("correct");recordAnswer(q.termId,true);
  $("feedback").innerHTML=`✅ <b>정답!</b> ${q.explain}<br><small style="color:#93c5fd">수업 필기 p.${q.sourcePage}</small><br><span style="color:#86efac">적에게 ${dmg} 피해 · ${battle.combo}콤보</span>`;
  popDamage(`-${dmg}`,"#86efac");
  if(battle.combo>=5)unlock("combo5");
 }else{
  AudioEngine.wrong();setTimeout(()=>AudioEngine.hurt(),100);
  battle.combo=0;battle.wrong++;
  const receivedDamage=(battle.mode==="advanced"||battle.mode==="boss")?18:20;
  battle.playerHp=clamp(battle.playerHp-receivedDamage,0,battle.maxPlayer);
  if(button)button.classList.add("wrong");recordAnswer(q.termId,false);
  const correctChoice=[...document.querySelectorAll("#answerArea .choice")].find(x=>normalize(x.textContent)===normalize(q.answer));
  if(correctChoice)correctChoice.classList.add("correct");
  $("feedback").innerHTML=`❌ 정답은 <b>${q.answer}</b><br>${q.explain}<br><small style="color:#93c5fd">수업 필기 p.${q.sourcePage}</small><br><span style="color:#fda4af">플레이어가 피해를 입었다.</span>`;
  popDamage(`-${receivedDamage}`,"#fda4af");
 }
 player.bestCombo=Math.max(player.bestCombo,battle.combo);
 $("playerHpBar").style.width=`${battle.playerHp}%`;$("enemyHpBar").style.width=`${battle.enemyHp/battle.maxEnemy*100}%`;
 $("playerHpText").textContent=`${battle.playerHp}/${battle.maxPlayer}`;$("enemyHpText").textContent=`${battle.enemyHp}/${battle.maxEnemy}`;
 $("battleCombo").textContent=battle.combo;$("battleScore").textContent=battle.score;
 const done=battle.playerHp<=0||battle.index>=battle.questions.length-1;
 $("nextQuestion").textContent=done?"전투 결과 보기":"다음 공격";
 $("nextQuestion").style.display="block";
 try{savePlayer()}catch(e){};
}
function popDamage(text,color){
 const d=document.createElement("div");d.className="damage";d.textContent=text;d.style.color=color;document.body.append(d);setTimeout(()=>d.remove(),850)
}
$("nextQuestion").onclick=()=>{
 const done=battle.playerHp<=0||battle.index>=battle.questions.length-1;
 if(done)finishBattle();else{battle.index++;renderBattle()}
};
function finishBattle(){
 const passRate=(battle.mode==="advanced"||battle.mode==="boss") ? 0.75 : 0.65;
 const requiredCorrect=Math.ceil(battle.questions.length*passRate);
 const won=battle.playerHp>0&&battle.correct>=requiredCorrect;
 if(won)battle.enemyHp=0;
 const xp=won?55+battle.correct*8:20+battle.correct*4,gold=won?25+battle.correct*3:5+battle.correct;
 const newly=[];player.gold+=gold;const leveled=gainXp(xp);
 if(won){player.wins++;unlock("firstWin",newly)}
 if(won&&battle.wrong===0)unlock("perfect",newly);
 if(won&&battle.mode==="boss"){player.bossWins++;unlock("boss",newly)}
 if(player.level>=5)unlock("level5",newly);savePlayer();
 AudioEngine.stopMusic();
 if(won)AudioEngine.victory();else AudioEngine.defeat();
 if(leveled)setTimeout(()=>AudioEngine.levelUp(),650);
 $("resultIcon").textContent=won?"🏆":"🛡️";$("resultTitle").textContent=won?"던전 클리어!":"퇴각했지만 경험은 남았다";
 $("resultDesc").textContent=`정답 ${battle.correct}/${battle.questions.length}개 · 통과 기준 ${requiredCorrect}개 · 오답 ${battle.wrong}개 · 최고 콤보 ${player.bestCombo}${leveled?" · 레벨 업!":""}`;
 $("rewardXp").textContent=xp;$("rewardGold").textContent=gold;
 $("newAchievements").innerHTML=newly.length?`<div class="notice">새 업적: ${newly.map(id=>ACHIEVEMENTS[id].icon+" "+ACHIEVEMENTS[id].name).join(", ")}</div>`:"";
 showScreen("result")
}
$("retryMode").onclick=()=>startBattle(player.lastMode);

$("openStudy").onclick=()=>{renderStudy();showScreen("study")};
document.querySelectorAll("[data-study]").forEach(b=>b.onclick=()=>{
 studyTab=b.dataset.study;document.querySelectorAll("[data-study]").forEach(x=>x.classList.toggle("active",x===b));
 $("studyGlossary").style.display=studyTab==="glossary"?"block":"none";$("studyFlash").style.display=studyTab==="flash"?"block":"none";$("studyFormula").style.display=studyTab==="formula"?"block":"none";
 if(studyTab==="flash")renderFlash()
});
function renderStudy(){
 const cats=["전체",...new Set(TERMS.map(t=>t.category))];$("categoryFilter").innerHTML=cats.map(c=>`<option>${c}</option>`).join("");
 renderTermCards();renderFormulas();renderFlash()
}
function renderTermCards(){
 const query=$("termSearch").value.trim().toLowerCase(),cat=$("categoryFilter").value||"전체";
 const list=TERMS.filter(t=>(cat==="전체"||t.category===cat)&&(!query||`${t.term} ${t.full} ${t.meaning}`.toLowerCase().includes(query)));
 $("termCards").innerHTML=list.map(t=>`<article class="term-card" data-term="${t.id}"><h3>${t.term}</h3><small>${t.category}</small><p class="term-detail" style="display:none"><b>${t.full}</b><br>${t.meaning}<br><small style="color:#93c5fd">수업 필기 p.${t.sourcePage}</small></p><div class="mastery" title="숙련도"><div style="width:${masteryPercent(t.id)}%"></div></div><small>${masteryLabel(t.id)}</small></article>`).join("")||'<div class="empty">검색 결과가 없어.</div>';
 document.querySelectorAll("#termCards .term-card").forEach(c=>c.onclick=()=>{
  const detail=c.querySelector(".term-detail");detail.style.display=detail.style.display==="none"?"block":"none";
  player.studyViews++;if(player.studyViews>=20)unlock("scholar");savePlayer()
 })
}
$("termSearch").oninput=renderTermCards;$("categoryFilter").onchange=renderTermCards;
function renderFormulas(){
 $("formulaGrid").innerHTML=FORMULAS.map(f=>`<article class="formula"><b>${f.name}</b><code>${f.formula}</code><p>${f.tip}</p></article>`).join("")
}
function renderFlash(){
 const t=TERMS[flashIndex%TERMS.length];
 $("flashCard").innerHTML=flashFlipped?`<div class="flash-back"><b>${t.full}</b><br><br>${t.meaning}<br><small style="color:#93c5fd">수업 필기 p.${t.sourcePage}</small></div><div class="hint">눌러서 용어 보기</div>`:`<div class="front">${t.term}</div><div class="hint">눌러서 뜻 보기</div>`;
}
$("flashCard").onclick=$("flipFlash").onclick=()=>{flashFlipped=!flashFlipped;player.studyViews++;if(player.studyViews>=20)unlock("scholar");savePlayer();renderFlash()};
$("prevFlash").onclick=()=>{flashIndex=(flashIndex-1+TERMS.length)%TERMS.length;flashFlipped=false;renderFlash()};
$("nextFlash").onclick=()=>{flashIndex=(flashIndex+1)%TERMS.length;flashFlipped=false;renderFlash()};

$("openProfile").onclick=()=>{renderProfile();showScreen("profile")};
function renderProfile(){
 const [rank,av]=rankFor(player.level);$("profileRank").textContent=`Lv.${player.level} ${rank}`;$("profileAvatar").textContent=av;
 $("profileStats").innerHTML=`승리 ${player.wins}회 · 보스 처치 ${player.bossWins}회 · 최고 콤보 ${player.bestCombo}<br>보유 골드 ${player.gold} · 누적 도감 열람 ${player.studyViews}회`;
 $("achievementCount").textContent=`${player.achievements.length}/${Object.keys(ACHIEVEMENTS).length}`;
 $("achievementGrid").innerHTML=Object.entries(ACHIEVEMENTS).map(([id,a])=>`<div class="ach ${player.achievements.includes(id)?"unlocked":""}"><div class="aicon">${a.icon}</div><b>${a.name}</b><small>${a.desc}</small></div>`).join("");
 const weak=TERMS.map(t=>({...t,m:masteryPercent(t.id),r:masteryRecord(t.id)})).sort((a,b)=>(a.m-b.m)||((b.r.wrong)-(a.r.wrong))).slice(0,6);
 $("weakTerms").innerHTML=weak.map(t=>`<article class="term-card"><h3>${t.term}</h3><p>${t.meaning}</p><div class="mastery"><div style="width:${t.m}%"></div></div><small>${(t.r.correct+t.r.wrong)?`숙련도 ${t.m}% · ${t.r.correct}/${t.r.correct+t.r.wrong} 정답`:"미학습"}</small></article>`).join("")
}
$("resetSave").onclick=()=>{if(confirm("레벨, 오답, 업적을 모두 초기화할까?")){SafeStore.remove(SAVE_KEY);player={...defaultPlayer,mastery:{},mistakes:[],achievements:[]};updateHeader();showScreen("home")}};


function showSoundToast(text){
 const t=$("soundToast");t.textContent=text;t.classList.add("show");clearTimeout(showSoundToast.timer);
 showSoundToast.timer=setTimeout(()=>t.classList.remove("show"),1300)
}
if($("soundToggle"))$("soundToggle").textContent=AudioEngine.enabled?"🔊":"🔇";
if($("volumeSlider"))$("volumeSlider").value=Math.round(AudioEngine.volume*100);
if($("soundToggle"))$("soundToggle").onclick=e=>{
 e.stopPropagation();AudioEngine.setEnabled(!AudioEngine.enabled);
 showSoundToast(AudioEngine.enabled?"BGM과 효과음이 켜졌어":"소리를 껐어");
};
if($("volumeSlider"))$("volumeSlider").oninput=e=>AudioEngine.setVolume(Number(e.target.value)/100);
document.addEventListener("pointerdown",e=>{
 AudioEngine.resume();
 if(AudioEngine.enabled&&!AudioEngine.timer)AudioEngine.startMusic("home");
 if(e.target.closest("button")&&!e.target.closest("#soundToggle"))AudioEngine.click();
},{once:false});

updateHeader();
window.__GAME_METRICS_READY__=true;
var fatalBox=document.getElementById("fatalError");
if(fatalBox)fatalBox.hidden=true;

})();
