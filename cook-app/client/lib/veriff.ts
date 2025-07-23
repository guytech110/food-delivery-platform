import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Veriff configuration
const VERIFF_PUBLIC_KEY = 'cbccf64e-fa26-4981-acd3-0219dc109f6f';

export interface VeriffSession {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  verificationData?: {
    documentVerified: boolean;
    faceMatched: boolean;
    livenessPassed: boolean;
    confidence: number;
  };
  documents?: {
    idFront?: string;
    idBack?: string;
    selfie?: string;
  };
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerNotes?: string;
}

export interface CookVerification {
  cookId: string;
  veriffSessionId?: string;
  status: 'pending' | 'approved' | 'rejected' | 'manual_review' | 'completed';
  verificationData?: {
    documentVerified: boolean;
    faceMatched: boolean;
    livenessPassed: boolean;
    confidence: number;
  };
  documents?: {
    idFront?: string;
    idBack?: string;
    selfie?: string;
    kitchenPhoto?: string;
  };
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerNotes?: string;
  completedAt?: Date;
}

class VeriffService {
  async createSession(cookId: string): Promise<string> {
    try {
      // Generate a session ID for now
      // TODO: Integrate with actual Veriff API when we have the correct endpoint
      const sessionId = `veriff_${cookId}_${Date.now()}`;
      
      // Store session in Firebase
      await this.storeVeriffSession(cookId, sessionId);

      return sessionId;
    } catch (error) {
      console.error('Error creating Veriff session:', error);
      throw error;
    }
  }

  async storeVeriffSession(cookId: string, sessionId: string): Promise<void> {
    try {
      const verificationRef = doc(db, 'cookVerifications', cookId);
      
      await setDoc(verificationRef, {
        cookId,
        veriffSessionId: sessionId,
        status: 'pending',
        submittedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error storing Veriff session:', error);
      throw error;
    }
  }

  async updateVerificationStatus(cookId: string, status: string, verificationData?: any): Promise<void> {
    try {
      const verificationRef = doc(db, 'cookVerifications', cookId);
      
      await updateDoc(verificationRef, {
        status,
        verificationData,
        reviewedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating verification status:', error);
      throw error;
    }
  }

  async getVerificationStatus(cookId: string): Promise<CookVerification | null> {
    try {
      const verificationRef = doc(db, 'cookVerifications', cookId);
      const verificationDoc = await getDoc(verificationRef);
      
      if (verificationDoc.exists()) {
        return verificationDoc.data() as CookVerification;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting verification status:', error);
      throw error;
    }
  }

  async launchVerification(sessionId: string): Promise<void> {
    try {
      // TODO: Integrate with actual Veriff SDK when we have the correct API
      console.log('Launching verification for session:', sessionId);
      
      // For now, we'll redirect to manual verification
      // This will be replaced with actual Veriff SDK integration
    } catch (error) {
      console.error('Error launching verification:', error);
      throw error;
    }
  }

  // Manual verification fallback - accumulates documents
  async submitManualVerification(cookId: string, newDocuments: any): Promise<void> {
    try {
      const verificationRef = doc(db, 'cookVerifications', cookId);
      
      // Get existing verification data
      const existingDoc = await getDoc(verificationRef);
      let existingData: CookVerification | null = null;
      
      if (existingDoc.exists()) {
        existingData = existingDoc.data() as CookVerification;
      }

      // Merge existing documents with new ones
      const mergedDocuments = {
        ...existingData?.documents,
        ...newDocuments
      };

      // Check if all required documents are present
      const hasAllDocuments = mergedDocuments.idFront && 
                             mergedDocuments.idBack && 
                             mergedDocuments.selfie && 
                             mergedDocuments.kitchenPhoto;

      const updateData: Partial<CookVerification> = {
        cookId,
        documents: mergedDocuments,
        submittedAt: existingData?.submittedAt || new Date(),
      };

      // If all documents are present, mark as completed
      if (hasAllDocuments) {
        updateData.status = 'completed';
        updateData.completedAt = new Date();
      } else {
        updateData.status = 'manual_review';
      }

      await setDoc(verificationRef, updateData, { merge: true });
    } catch (error) {
      console.error('Error submitting manual verification:', error);
      throw error;
    }
  }

  // Method to complete verification and update cook status
  async completeVerification(cookId: string): Promise<void> {
    try {
      // Update cook's verification status in the main cook document
      const cookRef = doc(db, 'cooks', cookId);
      await updateDoc(cookRef, {
        isVerified: true,
        verificationCompletedAt: new Date()
      });

      // Update verification status
      await this.updateVerificationStatus(cookId, 'completed');
    } catch (error) {
      console.error('Error completing verification:', error);
      throw error;
    }
  }

  // Method to create Veriff frame for manual integration
  createVeriffFrame(containerId: string) {
    try {
      return createVeriffFrame({
        // Note: The actual API parameters need to be determined from Veriff documentation
        // For now, we'll use a basic setup
      });
    } catch (error) {
      console.error('Error creating Veriff frame:', error);
      throw error;
    }
  }

  // Method to check if verification is complete
  async isVerificationComplete(cookId: string): Promise<boolean> {
    try {
      const verification = await this.getVerificationStatus(cookId);
      return verification?.status === 'completed';
    } catch (error) {
      console.error('Error checking verification completion:', error);
      return false;
    }
  }
}

export const veriffService = new VeriffService();
export default veriffService; 