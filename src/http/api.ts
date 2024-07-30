const API = {
  "login": "api/Auths/loginweb",
  "otp_trust": "api/Auths/otp-trust",
  "resend_otp": "api/Auths/resend-otp",
  "reset_password": "api/Auths/reset-password",
  "forgot_password": "api/Auths/forget-password",
  "login_refreshtoken": "api/Auths/login-refreshtoken",
  "user_update_password": "api/Users/updatepassword",
  "get_me": "api/Users/getmeweb",
  "search": "",
  "staffs_get": "api/Staffs/getlist",
  "staff_create": "api/Users/create",
  "staff_delete": "api/Staffs/delete",
  "staff_edit": "api/Staffs/Update",
  "organizations_get": "api/Organizations/getpaginationlist",
  "organization_create": "api/Organizations/create",
  "organization_delete": "api/Organizations/delete",
  "organization_status": "api/Organizations/updateActiveOrDeactive",
  "organization_requests_all": "request/organization-requests",
  "organization_edit": "api/Organizations/update",
  "organization_comments": "api/v1/comments/request/{{id}}",
  "create_comment": "api/v1/comments/post",
  "organization_getlist": "api/Organizations/getlist"
};

export default API;