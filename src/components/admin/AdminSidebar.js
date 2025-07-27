'use client';

import React, { useState } from 'react';
import { Box, Tab, Tabs, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';
import StorageIcon from '@mui/icons-material/Storage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function AdminSidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/admin/home', label: 'Anasayfa', icon: <HomeIcon /> },
    { path: '/admin/services', label: 'Hizmetler', icon: <BusinessCenterIcon /> },
    { path: '/admin/projects', label: 'Projeler', icon: <WorkIcon /> },
    { path: '/admin/blogs', label: 'Blog', icon: <MenuBookIcon /> },
    { path: '/admin/languages', label: 'Diller', icon: <LanguageIcon /> },
    { path: '/admin/seed', label: 'Veri Yükleme', icon: <StorageIcon /> },
    { path: '/admin/settings', label: 'Ayarlar', icon: <SettingsIcon /> },
    { path: '/admin/users', label: 'Kullanıcılar', icon: <PeopleIcon /> },
  ];
  
  // Aktif sayfayı belirleme
  const activeTab = menuItems.findIndex(item => pathname.startsWith(item.path)) || 0;
  
  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'background.paper', 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%' 
    }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activeTab !== -1 ? activeTab : 0}
        aria-label="Admin navigation tabs"
        sx={{
          borderRight: 1, 
          borderColor: 'divider',
          height: '100%',
          '& .MuiTab-root': {
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
            pl: 2
          }
        }}
      >
        {menuItems.map((item, index) => (
          <Tab 
            key={item.path}
            component={Link}
            href={item.path}
            label={item.label} 
            icon={item.icon}
            iconPosition="start"
            sx={{ minHeight: '48px' }}
          />
        ))}
      </Tabs>
      
      <Box sx={{ p: 2, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
        <Button 
          component={Link}
          href="/"
          variant="outlined" 
          color="primary" 
          fullWidth
        >
          Siteye Dön
        </Button>
      </Box>
    </Box>
  );
}

export default AdminSidebar;
