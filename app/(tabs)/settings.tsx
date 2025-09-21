import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { User, Bell, Shield, Palette, Globe, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const settingsItems = [
    {
      id: 'profile',
      title: 'Profil',
      icon: User,
      type: 'navigation',
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      icon: Bell,
      type: 'toggle',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      id: 'privacy',
      title: 'Gizlilik ve Güvenlik',
      icon: Shield,
      type: 'navigation',
    },
    {
      id: 'theme',
      title: 'Koyu Tema',
      icon: Palette,
      type: 'toggle',
      value: darkMode,
      onToggle: setDarkMode,
    },
    {
      id: 'language',
      title: 'Dil',
      icon: Globe,
      type: 'navigation',
      subtitle: 'Türkçe',
    },
    {
      id: 'help',
      title: 'Yardım ve Destek',
      icon: HelpCircle,
      type: 'navigation',
    },
    {
      id: 'logout',
      title: 'Çıkış Yap',
      icon: LogOut,
      type: 'action',
      color: '#FF3B30',
    },
  ];

  const renderSettingItem = (item: any) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity key={item.id} style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <View style={[styles.iconContainer, item.color && { backgroundColor: `${item.color}15` }]}>
            <IconComponent 
              size={20} 
              color={item.color || '#007AFF'} 
            />
          </View>
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, item.color && { color: item.color }]}>
              {item.title}
            </Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.settingRight}>
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          ) : (
            <ChevronRight size={20} color="#C7C7CC" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>
      
      <ScrollView style={styles.settingsList} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>S</Text>
          </View>
          <Text style={styles.profileName}>Sen</Text>
          <TouchableOpacity style={styles.aboutContainer}>
            <Text style={styles.aboutLabel}>Hakkında</Text>
            <Text style={styles.aboutText}>Merhaba! WhatsApp kullanıyorum.</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsGroup}>
          {settingsItems.map(renderSettingItem)}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sürüm 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  settingsList: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 32,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
  },
  aboutContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  aboutLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  aboutText: {
    fontSize: 14,
    color: '#1C1C1E',
    textAlign: 'center',
    lineHeight: 18,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#007AFF15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});