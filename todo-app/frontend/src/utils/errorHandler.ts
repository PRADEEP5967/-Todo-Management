export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 400:
        return error.response.data.message || 'Bad Request';
      case 401:
        return 'Unauthorized. Please sign in again.';
      case 403:
        return 'Access forbidden. You do not have permission to access this resource.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Internal server error. Please try again later.';
      default:
        return error.response.data.message || `Error: ${error.response.status}`;
    }
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection and try again.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred.';
  }
};