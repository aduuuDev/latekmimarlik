import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getSessionWithAuth } from "@/utils/authHelpers";
import PlatformSettings from '@/models/PlatformSettings';

// İstek yönetimi
export async function GET(request) {
  try {
    const session = await getSessionWithAuth();
    
    // Kullanıcı kontrolü
    if (!session) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }
    
    // Veritabanı bağlantısı
    await dbConnect();
    
    // Platform ayarlarını getir veya oluştur
    let platformSettings = await PlatformSettings.findOne({ type: 'platformSettings' });
    
    // Yoksa varsayılan değerlerle oluştur
    if (!platformSettings) {
      platformSettings = await PlatformSettings.create({
        type: 'platformSettings',
        platformName: {},
        contactEmail: '',
        contactPhone: '',
        address: {},
        social: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          youtube: ''
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: platformSettings
    });
    
  } catch (error) {
    console.error('Platform settings GET error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSessionWithAuth();
    
    // Kullanıcı kontrolü
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Permission denied' }, { status: 403 });
    }
    
    // Gelen veriyi al
    const { data } = await request.json();
    
    // Veritabanı bağlantısı
    await dbConnect();
    
    // Mevcut platform ayarlarını bul veya oluştur
    let platformSettings = await PlatformSettings.findOne({ type: 'platformSettings' });
    
    if (platformSettings) {
      // Varsa güncelle
      platformSettings.platformName = data.platformName || {};
      platformSettings.contactEmail = data.contactEmail || '';
      platformSettings.contactPhone = data.contactPhone || '';
      platformSettings.address = data.address || {};
      platformSettings.social = data.social || {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: ''
      };
      
      await platformSettings.save();
    } else {
      // Yoksa oluştur
      platformSettings = await PlatformSettings.create({
        type: 'platformSettings',
        platformName: data.platformName || {},
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        address: data.address || {},
        social: data.social || {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          youtube: ''
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Platform settings updated successfully',
      data: platformSettings
    });
    
  } catch (error) {
    console.error('Platform settings POST error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
