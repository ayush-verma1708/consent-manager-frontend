import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchBanners } from '../api/BannerApi'; // Import fetchBanners from BannerApi.js

const ViewBanners = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch banners using the imported function
    const loadBanners = async () => {
      try {
        const fetchedBanners = await fetchBanners();
        setBanners(fetchedBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    loadBanners();
  }, []);

  const handlePreview = (banner) => {
    setSelectedBanner(banner);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedBanner(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant='h4' gutterBottom>
        View Banners
      </Typography>
      {banners.length === 0 ? (
        <Typography variant='body1'>No banners available.</Typography>
      ) : (
        <Box
          display='grid'
          gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'
          gap={3}
        >
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent>
                <Typography variant='h6'>{banner.text}</Typography>
                <Typography variant='body2' sx={{ marginBottom: 2 }}>
                  {banner.description || 'No description available.'}
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handlePreview(banner)}
                >
                  Preview
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      {/* Dialog for Preview */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          Banner Preview
          <IconButton
            aria-label='close'
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {selectedBanner && (
          <DialogContent>
            <Box
              sx={{
                backgroundColor: selectedBanner.backgroundColor,
                color: selectedBanner.textColor,
                padding: 2,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant='h6'>{selectedBanner.text}</Typography>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: selectedBanner.buttonColor,
                  color: '#fff',
                  marginTop: 2,
                }}
              >
                {selectedBanner.buttonText}
              </Button>
              <Box sx={{ marginTop: 3 }}>
                <Typography variant='body2'>
                  <strong>Privacy Policy:</strong>{' '}
                  <a
                    href={selectedBanner.privacyPolicyLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {selectedBanner.privacyPolicyLink}
                  </a>
                </Typography>
                <Typography variant='body2'>
                  <strong>Terms & Conditions:</strong>{' '}
                  <a
                    href={selectedBanner.termsLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {selectedBanner.termsLink}
                  </a>
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default ViewBanners;
