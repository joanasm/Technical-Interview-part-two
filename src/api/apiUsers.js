import axios from '../axios';

export class UsersApi {
  static async getUsers() {
    try {
      const response = await axios.get('/users');
      return response.data;
    } catch (error) {
      return {
        error: true,
        errorMessage: error.message
      };
    }
  }

  static async getUserPosts(userId) {
    try {
      const response = await axios.get('/posts/?userId=' + userId);
      return response.data;
    } catch (error) {
      return {
        error: true,
        errorMessage: error.message
      };
    }
  }

  static async updateUser(user) {
    try {
      if (!user || !user.id)
        return {
          error: true,
          errorMessage: 'User Id Not Specified!'
        };
      const response = await axios.put('/users/' + user.id, user);
      return response.data;
    } catch (error) {
      return {
        error: true,
        errorMessage: error.message
      };
    }
  }
}
