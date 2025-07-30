import api from "./index";

// 허용된 기업 불러오기
export const getAllowedCompanies = async () => {
  try {
    const response = await api.get("/api/v1/companies");

    // 현재 등록된 기업이 없으면 추가
    if (response.data.companies.length === 0) {
      response.data.companies.push({
        id: 1,
        companyName: "현재 등록된 기업이 없습니다.",
      });
    }
    return response.data;
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
      fullName: name,
    });
    return response.data;
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
    const response = await api.post("/api/v1/companies", {
      companyName,
      businessNumber,
      companyNumber,
      job,
    });
    return response.data;
  } catch (error) {
    console.error("기관/기업명 추가 요청 에러:", error);
    throw error;
  }
};
