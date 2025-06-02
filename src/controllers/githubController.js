import axios from "axios";
import { db } from "../dbs/index.js";

export const searchGithubUsers = async (req, res) => {
  try {
    const { q, page = 1, per_page = 10 } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Query is required'
      });
    }

    const response = await axios.get('https://api.github.com/search/users', {
      params: {
        q: q,
        page: page,
        per_page: per_page
      },
      headers: {
        'User-Agent': 'GitHub-Search-App'
      }
    });

    const users = response.data.items.map(user => ({
      login: user.login,
      id: user.id,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      type: user.type
    }));

    res.json(users);
  } catch (error) {
    console.error('Error searching GitHub users:', error.message);
    res.status(500).json({ error: 'Failed to search GitHub users' });
  }
}

export const findGithubUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    const response = await axios.get(`https://api.github.com/user/${id}`, {
      headers: {
        'User-Agent': 'GitHub-Search-App'
      }
    });

    const userProfile = {
      login: response.data.login,
      id: response.data.id,
      avatar_url: response.data.avatar_url,
      html_url: response.data.html_url,
      public_repos: response.data.public_repos,
      followers: response.data.followers
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub user profile' });
  }
}

export const likeGithubUser = async (req, res) => {
  try {
    const { phoneNumber, likedIds } = req.body;
    if (!phoneNumber || !likedIds) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and GitHub user ID are required'
      });
    }
    const response = await axios.get(`https://api.github.com/user/${likedIds}`, {
      headers: {
        'User-Agent': 'GitHub-Search-App'
      }
    });

    await db.collection('users').doc(phoneNumber).update({
      favorite_github_users: likedIds.map(id => ({ id, phoneNumber }))
    });

    res.json({
      success: true,
      message: 'GitHub user liked successfully'
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'GitHub user not found' });
    }
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }
    const userProfile = await db.collection('users').doc(phoneNumber).get();
    res.json(userProfile.data().favorite_github_users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}