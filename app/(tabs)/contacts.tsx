import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MessageCircle, Phone } from 'lucide-react-native';

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
}

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    lastMessage: 'Mesajın için teşekkürler! 😊',
    timestamp: '12:34',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    lastMessage: 'Yarın görüşürüz',
    timestamp: '11:22',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    lastMessage: 'Toplantı saat kaçta?',
    timestamp: '10:15',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Fatma Özkan',
    lastMessage: 'Teşekkürler!',
    timestamp: 'Dün',
    isOnline: false,
  },
];

export default function ContactsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sohbetler</Text>
      </View>
      
      <ScrollView style={styles.contactsList} showsVerticalScrollIndicator={false}>
        {contacts.map((contact) => (
          <TouchableOpacity key={contact.id} style={styles.contactItem}>
            <View style={styles.contactInfo}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {contact.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                {contact.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.contactDetails}>
                <View style={styles.contactHeader}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.timestamp}>{contact.timestamp}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {contact.lastMessage}
                </Text>
              </View>
            </View>
            
            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={20} color="#34C759" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
  contactsList: {
    flex: 1,
  },
  contactItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contactDetails: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
});