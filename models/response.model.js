class ApiResponse {

  static success(message, data, meta = {}) {
    return {
      success:   true,
      message,
      data,
      ...meta,       
      timestamp: new Date().toISOString()
    };
  }

  static error(message, code = 500, details = null) {
    return {
      success:   false,
      message,
      code,
      ...(details && { details }),
      timestamp: new Date().toISOString()
    };
  }

  static paginated(data, total, page, pageSize) {
    return {
      success: true,
      data,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      },
      timestamp: new Date().toISOString()
    };
  }

}

module.exports = ApiResponse;