class ApiResponse {
  constructor(statusCode, data, message = "", status = "Success", role = "") {
    this.statusCode = statusCode;
    this.data = data || null;
    this.message = message;
    this.status = status;
    this.role = role;
  }
}

export { ApiResponse };
