import api from "./index";

// 허용된 기업 불러오기
export const getAllowedCompanies = async () => {
  try {
    const response = await api.get("/api/v1/companies");
    return response.data;

    // return [
    //   { id: 1, name: "기관/기업명1" },
    //   { id: 2, name: "기관/기업명2" },
    // ];
  } catch (error) {
    console.error("회사 불러오기 에러:", error);
    throw error;
  }
};

// 회원가입
export const registerUser = async (userData) => {
  const { email, password, passwordConfirm, company, name } = userData;

  try {
    const response = await api.post("/api/v1/auth/signup", {
      username: email,
      password: password,
      passwordConfirm: passwordConfirm,
      companyId: company,
      name: name,
    });
    // return response.data;

    return {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      company: "기관/기업명1",
    };
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};

// 로그인
export const loginUser = async (userData) => {
  const { email, password } = userData;
  try {
    const response = await api.post("/api/v1/auth/login", {
      username: email,
      password: password,
    });
    const user = response.data;
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user.user));
    localStorage.setItem("userEmail", user.user.username);

    return response.data;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};

// 비밀번호 재설정
export const resetPassword = async (password, token) => {
  try {
    // const response = await api.post("/api/user/reset-password", {
    //   password,
    //   token,
    // });
    // return response.data;
    return { status: 200 };
  } catch (error) {
    console.error("비밀번호 재설정 에러:", error);
    throw error;
  }
};

export const requestCompany = async (
  companyName,
  businessNumber,
  companyNumber,
  job
) => {
  try {
    // const response = await api.post("/api/user/request-company", {
    //   companyName,
    //   businessNumber,
    //   companyNumber,
    //   job,
    // });
    // return response.data;
    return { status: 200 };
  } catch (error) {
    console.error("기관/기업명 추가 요청 에러:", error);
    throw error;
  }
};
