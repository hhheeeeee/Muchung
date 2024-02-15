// GPT에 응답 요청 시 JSON 형식을 강제한다.
// 하지만 JSON 형식으로 오지 않을 때도 종종 있다.
// TODO: 나중에 시간 남으면 하겠습니다 (수현)
export const parseGptResponse = (response) => {
    // 1) JSON 타입이 맞다.
    try {
        // const jsObj = JSON.parse(response);
    }
    // 2) JSON 타입이 아니다. -> \n 기준으로 한 줄씩 잘라야 할 듯?
    catch (e) {
        
    }
}