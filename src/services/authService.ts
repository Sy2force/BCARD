

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
}

// Service d'authentification simulé
class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulation d'une API - remplacer par un vrai appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données simulées
      const mockResponse: AuthResponse = {
        token: this.generateMockToken(credentials.email),
        user: {
          id: '1',
          name: credentials.email === 'admin@bcard.com' ? 'Admin User' : 'John Doe',
          email: credentials.email,
          role: credentials.email === 'admin@bcard.com' ? 'admin' : 'user',
        }
      };

      return mockResponse;
    } catch {
      throw new Error('Erreur de connexion');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Simulation d'une API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (data.password !== data.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      const mockResponse: AuthResponse = {
        token: this.generateMockToken(data.email),
        user: {
          id: Date.now().toString(),
          name: data.name,
          email: data.email,
          role: 'user',
        }
      };

      return mockResponse;
    } catch {
      throw new Error('Erreur lors de l\'inscription');
    }
  }

  private generateMockToken(email: string): string {
    // Génération d'un token JWT simulé
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      id: email === 'admin@bcard.com' ? '1' : Date.now().toString(),
      email,
      name: email === 'admin@bcard.com' ? 'Admin User' : 'John Doe',
      role: email === 'admin@bcard.com' ? 'admin' : 'user',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24h
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }

  async logout(): Promise<void> {
    // Simulation de déconnexion
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

export const authService = new AuthService();
