

export interface BusinessCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  company: string;
  position: string;
  address?: string;
  image?: string;
  backgroundColor: string;
  textColor: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateCardData {
  title: string;
  subtitle: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  company: string;
  position: string;
  address?: string;
  image?: string;
  backgroundColor: string;
  textColor: string;
}

// Service pour les cartes de visite simulé
class CardsService {
  private mockCards: BusinessCard[] = [
    {
      id: '1',
      title: 'Développeur Full Stack',
      subtitle: 'Expert React & Node.js',
      description: 'Passionné par les technologies modernes et l\'innovation',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      website: 'https://jeandupont.dev',
      company: 'TechCorp',
      position: 'Senior Developer',
      address: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      backgroundColor: '#667eea',
      textColor: '#ffffff',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '1',
    },
    {
      id: '2',
      title: 'Designer UX/UI',
      subtitle: 'Créatrice d\'expériences digitales',
      description: 'Design thinking et innovation au service de l\'utilisateur',
      name: 'Marie Martin',
      email: 'marie.martin@design.com',
      phone: '+33 6 98 76 54 32',
      website: 'https://mariemartin.design',
      company: 'Creative Studio',
      position: 'Lead Designer',
      address: 'Lyon, France',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      backgroundColor: '#764ba2',
      textColor: '#ffffff',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '2',
    },
    {
      id: '3',
      title: 'Marketing Digital',
      subtitle: 'Stratège en croissance',
      description: 'Spécialiste en acquisition et rétention client',
      name: 'Pierre Durand',
      email: 'pierre.durand@marketing.com',
      phone: '+33 6 11 22 33 44',
      website: 'https://pierredurand.marketing',
      company: 'Growth Agency',
      position: 'Marketing Manager',
      address: 'Marseille, France',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      backgroundColor: '#f093fb',
      textColor: '#ffffff',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '3',
    },
  ];

  async getAllCards(): Promise<BusinessCard[]> {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...this.mockCards];
  }

  async getCardById(id: string): Promise<BusinessCard | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockCards.find(card => card.id === id) || null;
  }

  async createCard(data: CreateCardData): Promise<BusinessCard> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newCard: BusinessCard = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '1', // Simulé
    };

    this.mockCards.push(newCard);
    return newCard;
  }

  async updateCard(id: string, data: Partial<CreateCardData>): Promise<BusinessCard> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cardIndex = this.mockCards.findIndex(card => card.id === id);
    if (cardIndex === -1) {
      throw new Error('Carte non trouvée');
    }

    this.mockCards[cardIndex] = {
      ...this.mockCards[cardIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.mockCards[cardIndex];
  }

  async getCard(id: string): Promise<BusinessCard> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const card = this.mockCards.find(card => card.id === id);
    if (!card) {
      throw new Error('Carte non trouvée');
    }

    return card;
  }

  async deleteCard(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cardIndex = this.mockCards.findIndex(card => card.id === id);
    if (cardIndex === -1) {
      throw new Error('Carte non trouvée');
    }

    this.mockCards.splice(cardIndex, 1);
  }

  async searchCards(query: string): Promise<BusinessCard[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const lowercaseQuery = query.toLowerCase();
    return this.mockCards.filter(card =>
      card.title.toLowerCase().includes(lowercaseQuery) ||
      card.subtitle.toLowerCase().includes(lowercaseQuery) ||
      card.description.toLowerCase().includes(lowercaseQuery) ||
      card.name.toLowerCase().includes(lowercaseQuery) ||
      card.company.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const cardsService = new CardsService();
