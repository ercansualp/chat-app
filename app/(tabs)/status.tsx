import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Plus, Camera, Type, Palette } from 'lucide-react-native';

interface StatusUpdate {
  id: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  type: 'text' | 'image' | 'video';
  content: string;
  backgroundColor?: string;
  textColor?: string;
  viewed: boolean;
}

const { width } = Dimensions.get('window');

export default function StatusScreen() {
  const [myStatus, setMyStatus] = useState<StatusUpdate | null>(null);
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([
    {
      id: '1',
      userName: 'Ayşe Demir',
      userAvatar: 'A',
      timestamp: '2 saat önce',
      type: 'text',
      content: 'Güzel bir gün! ☀️',
      backgroundColor: '#FF6B6B',
      textColor: '#FFFFFF',
      viewed: false,
    },
    {
      id: '2',
      userName: 'Mehmet Kaya',
      userAvatar: 'M',
      timestamp: '4 saat önce',
      type: 'image',
      content: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
      viewed: true,
    },
    {
      id: '3',
      userName: 'Fatma Özkan',
      userAvatar: 'F',
      timestamp: '6 saat önce',
      type: 'text',
      content: 'Kahve molası ☕',
      backgroundColor: '#4ECDC4',
      textColor: '#FFFFFF',
      viewed: false,
    },
    {
      id: '4',
      userName: 'Ali Yılmaz',
      userAvatar: 'A',
      timestamp: '8 saat önce',
      type: 'image',
      content: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      viewed: true,
    },
  ]);

  const recentUpdates = statusUpdates.filter(status => 
    new Date().getTime() - new Date(status.timestamp).getTime() < 24 * 60 * 60 * 1000
  );

  const viewedUpdates = statusUpdates.filter(status => status.viewed);
  const unviewedUpdates = statusUpdates.filter(status => !status.viewed);

  const handleCreateStatus = (type: 'text' | 'camera') => {
    // Bu fonksiyon durum oluşturma ekranına yönlendirecek
    console.log('Creating status:', type);
  };

  const handleViewStatus = (statusId: string) => {
    setStatusUpdates(prev => 
      prev.map(status => 
        status.id === statusId ? { ...status, viewed: true } : status
      )
    );
  };

  const renderStatusItem = (status: StatusUpdate, isMyStatus = false) => (
    <TouchableOpacity
      key={status.id}
      style={styles.statusItem}
      onPress={() => !isMyStatus && handleViewStatus(status.id)}
    >
      <View style={styles.statusLeft}>
        <View style={[
          styles.statusAvatar,
          !status.viewed && !isMyStatus && styles.unviewedBorder,
          isMyStatus && styles.myStatusBorder
        ]}>
          {status.type === 'image' ? (
            <Image 
              source={{ uri: status.content }} 
              style={styles.statusAvatarImage}
            />
          ) : (
            <View style={[
              styles.statusAvatarText,
              { backgroundColor: status.backgroundColor || '#007AFF' }
            ]}>
              <Text style={[
                styles.statusAvatarTextContent,
                { color: status.textColor || '#FFFFFF' }
              ]}>
                {status.userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          {isMyStatus && (
            <View style={styles.addStatusButton}>
              <Plus size={12} color="#FFFFFF" />
            </View>
          )}
        </View>
        
        <View style={styles.statusInfo}>
          <Text style={styles.statusUserName}>
            {isMyStatus ? 'Durumum' : status.userName}
          </Text>
          <Text style={styles.statusTimestamp}>
            {isMyStatus ? 'Durum eklemek için dokunun' : status.timestamp}
          </Text>
        </View>
      </View>

      {status.type === 'text' && (
        <View style={[
          styles.statusPreview,
          { backgroundColor: status.backgroundColor || '#007AFF' }
        ]}>
          <Text style={[
            styles.statusPreviewText,
            { color: status.textColor || '#FFFFFF' }
          ]}>
            {status.content}
          </Text>
        </View>
      )}

      {status.type === 'image' && (
        <View style={styles.statusPreview}>
          <Image 
            source={{ uri: status.content }} 
            style={styles.statusPreviewImage}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Durum</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* My Status Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.myStatusContainer}
            onPress={() => handleCreateStatus('text')}
          >
            <View style={styles.statusLeft}>
              <View style={[styles.statusAvatar, styles.myStatusBorder]}>
                <View style={styles.statusAvatarText}>
                  <Text style={styles.statusAvatarTextContent}>S</Text>
                </View>
                <View style={styles.addStatusButton}>
                  <Plus size={12} color="#FFFFFF" />
                </View>
              </View>
              
              <View style={styles.statusInfo}>
                <Text style={styles.statusUserName}>Durumum</Text>
                <Text style={styles.statusTimestamp}>
                  Durum eklemek için dokunun
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => handleCreateStatus('camera')}
            >
              <Camera size={20} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Kamera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickActionButton, styles.textStatusButton]}
              onPress={() => handleCreateStatus('text')}
            >
              <Type size={20} color="#FFFFFF" />
              <Text style={styles.quickActionText}>Metin</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Updates */}
        {unviewedUpdates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Son güncellemeler</Text>
            {unviewedUpdates.map(status => renderStatusItem(status))}
          </View>
        )}

        {/* Viewed Updates */}
        {viewedUpdates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Görüntülenen güncellemeler</Text>
            {viewedUpdates.map(status => renderStatusItem(status))}
          </View>
        )}

        {/* Empty State */}
        {statusUpdates.length === 0 && (
          <View style={styles.emptyState}>
            <Palette size={48} color="#8E8E93" />
            <Text style={styles.emptyStateTitle}>Henüz durum yok</Text>
            <Text style={styles.emptyStateText}>
              Arkadaşlarınızın durumları burada görünecek
            </Text>
          </View>
        )}
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginHorizontal: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  myStatusContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  statusItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    position: 'relative',
  },
  unviewedBorder: {
    borderWidth: 3,
    borderColor: '#25D366',
  },
  myStatusBorder: {
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  statusAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  statusAvatarText: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusAvatarTextContent: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  addStatusButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusInfo: {
    flex: 1,
  },
  statusUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  statusTimestamp: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statusPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  statusPreviewText: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#25D366',
    gap: 8,
  },
  textStatusButton: {
    backgroundColor: '#007AFF',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
});