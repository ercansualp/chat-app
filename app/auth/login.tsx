import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Phone, ArrowRight } from 'lucide-react-native';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format as Turkish phone number
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && cleaned.startsWith('5');
  };

  const handleLogin = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Hata', 'Lütfen geçerli bir telefon numarası girin (5XX XXX XX XX)');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to verification screen
      router.push({
        pathname: '/auth/verify',
        params: { phoneNumber: phoneNumber.replace(/\D/g, '') }
      });
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidPhone = validatePhoneNumber(phoneNumber);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Phone size={32} color="#007AFF" />
          </View>
          <Text style={styles.title}>Telefon Numaranızı Girin</Text>
          <Text style={styles.subtitle}>
            Size SMS ile doğrulama kodu göndereceğiz
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>🇹🇷 +90</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              placeholder="5XX XXX XX XX"
              placeholderTextColor="#8E8E93"
              keyboardType="phone-pad"
              maxLength={13}
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              isValidPhone ? styles.loginButtonActive : styles.loginButtonInactive
            ]}
            onPress={handleLogin}
            disabled={!isValidPhone || isLoading}
          >
            <Text
              style={[
                styles.loginButtonText,
                isValidPhone ? styles.loginButtonTextActive : styles.loginButtonTextInactive
              ]}
            >
              {isLoading ? 'Gönderiliyor...' : 'Devam Et'}
            </Text>
            {!isLoading && (
              <ArrowRight
                size={20}
                color={isValidPhone ? '#FFFFFF' : '#8E8E93'}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Devam ederek{' '}
            <Text style={styles.linkText}>Kullanım Şartları</Text>
            {' '}ve{' '}
            <Text style={styles.linkText}>Gizlilik Politikası</Text>
            'nı kabul etmiş olursunuz.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 48,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 24,
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E5EA',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1C1C1E',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  loginButtonActive: {
    backgroundColor: '#007AFF',
  },
  loginButtonInactive: {
    backgroundColor: '#F2F2F7',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonTextActive: {
    color: '#FFFFFF',
  },
  loginButtonTextInactive: {
    color: '#8E8E93',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});