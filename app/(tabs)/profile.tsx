import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Camera, CreditCard as Edit3, Phone, Mail, Calendar, MapPin, Save, X } from 'lucide-react-native';

interface UserProfile {
  name: string;
  about: string;
  phone: string;
  email: string;
  birthDate: string;
  location: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Ahmet Yılmaz',
    about: 'Merhaba! WhatsApp kullanıyorum.',
    phone: '+90 555 123 45 67',
    email: 'ahmet@example.com',
    birthDate: '15 Mart 1990',
    location: 'İstanbul, Türkiye',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);
  const [tempValue, setTempValue] = useState('');

  const handleEditField = (field: keyof UserProfile) => {
    setEditingField(field);
    setTempValue(editedProfile[field]);
    setShowEditModal(true);
  };

  const handleSaveField = () => {
    if (editingField) {
      setEditedProfile(prev => ({
        ...prev,
        [editingField]: tempValue
      }));
    }
    setShowEditModal(false);
    setEditingField(null);
    setTempValue('');
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi');
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getFieldLabel = (field: keyof UserProfile) => {
    const labels = {
      name: 'Ad Soyad',
      about: 'Hakkında',
      phone: 'Telefon',
      email: 'E-posta',
      birthDate: 'Doğum Tarihi',
      location: 'Konum',
    };
    return labels[field];
  };

  const getFieldIcon = (field: keyof UserProfile) => {
    const icons = {
      name: Edit3,
      about: Edit3,
      phone: Phone,
      email: Mail,
      birthDate: Calendar,
      location: MapPin,
    };
    return icons[field];
  };

  const profileFields: (keyof UserProfile)[] = ['name', 'about', 'phone', 'email', 'birthDate', 'location'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        {!isEditing ? (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Edit3 size={20} color="#007AFF" />
            <Text style={styles.editButtonText}>Düzenle</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancelEdit}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <Save size={16} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profilePictureSection}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profilePictureText}>
                {(isEditing ? editedProfile.name : profile.name).charAt(0).toUpperCase()}
              </Text>
            </View>
            {isEditing && (
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.profileName}>
            {isEditing ? editedProfile.name : profile.name}
          </Text>
        </View>

        {/* Profile Fields */}
        <View style={styles.fieldsContainer}>
          {profileFields.map((field) => {
            const IconComponent = getFieldIcon(field);
            const value = isEditing ? editedProfile[field] : profile[field];
            
            return (
              <TouchableOpacity
                key={field}
                style={styles.fieldItem}
                onPress={() => isEditing && handleEditField(field)}
                disabled={!isEditing}
              >
                <View style={styles.fieldLeft}>
                  <View style={styles.fieldIconContainer}>
                    <IconComponent size={18} color="#007AFF" />
                  </View>
                  <View style={styles.fieldContent}>
                    <Text style={styles.fieldLabel}>{getFieldLabel(field)}</Text>
                    <Text style={[
                      styles.fieldValue,
                      field === 'about' && styles.fieldValueMultiline
                    ]}>
                      {value}
                    </Text>
                  </View>
                </View>
                {isEditing && (
                  <Edit3 size={16} color="#C7C7CC" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoTitle}>Ek Bilgiler</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Katılma Tarihi</Text>
            <Text style={styles.infoValue}>15 Ocak 2024</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Son Görülme</Text>
            <Text style={styles.infoValue}>Çevrimiçi</Text>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <X size={24} color="#8E8E93" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {editingField && getFieldLabel(editingField)}
              </Text>
              <TouchableOpacity onPress={handleSaveField}>
                <Text style={styles.modalSaveText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={[
                styles.modalInput,
                editingField === 'about' && styles.modalInputMultiline
              ]}
              value={tempValue}
              onChangeText={setTempValue}
              placeholder={editingField && getFieldLabel(editingField)}
              placeholderTextColor="#8E8E93"
              multiline={editingField === 'about'}
              numberOfLines={editingField === 'about' ? 4 : 1}
              autoFocus
            />
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#007AFF15',
  },
  editButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  profilePictureSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profilePictureText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '600',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  fieldsContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  fieldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fieldIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#007AFF15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
    fontWeight: '500',
  },
  fieldValue: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  fieldValueMultiline: {
    lineHeight: 20,
  },
  additionalInfo: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: 200,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  modalSaveText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  modalInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1C1E',
    minHeight: 48,
  },
  modalInputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});