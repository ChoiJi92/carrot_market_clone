// rest api 키
const CLIENT_ID = "c8dd09da9391498bd9018eda3b52499f";

const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
