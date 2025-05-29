import React, { useState } from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  InputAdornment, 
  IconButton,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonitorIcon from '@mui/icons-material/Monitor';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/affiliate/AffiliateProgram.css';

// Define the system's orange/amber color as a constant
const SYSTEM_COLOR = '#ff9a00';
const SYSTEM_COLOR_DARK = '#ffb340';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: SYSTEM_COLOR,
  color: 'white',
  borderRadius: '50px',
  padding: '12px 30px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: SYSTEM_COLOR_DARK,
  },
}));

const StepperBox = styled(Box)(({ theme }) => ({
  marginTop: '30px',
  marginBottom: '30px',
}));

const StepNumberAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: SYSTEM_COLOR,
  color: 'white',
  fontWeight: 'bold',
  position: 'absolute',
  top: '-15px',
  left: '-15px',
  zIndex: 2,
  width: 35,
  height: 35,
  fontSize: '1.2rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a2e',
  borderRadius: '12px',
  padding: '20px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  '@media (max-width: 768px)': {
    padding: '15px 10px',
  },
  '@media (max-width: 480px)': {
    padding: '12px 8px',
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: SYSTEM_COLOR,
  borderRadius: '50%',
  width: '70px',
  height: '70px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    width: '60px',
    height: '60px',
    marginBottom: '15px',
  },
  '@media (max-width: 480px)': {
    width: '50px',
    height: '50px',
    marginBottom: '10px',
    '& .MuiSvgIcon-fontSizeLarge': {
      fontSize: '1.5rem',
    }
  }
}));

const AffiliateProgram = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginForm);
  };

  const handleRegister = () => {
    navigate('/affiliate/register');
  };

  // Agent program steps
  const steps = [
    {
      label: 'REGISTER as AN AGENT',
      description: 'Sign up for our affiliate program and get your unique tracking ID.',
      icon: <PersonIcon />
    },
    {
      label: 'Get your own AGENT Tracker',
      description: 'Access your personal dashboard to monitor referrals and earnings.',
      icon: <LocationOnIcon />
    },
    {
      label: 'Help your Player Deposit and Play',
      description: 'Guide your referrals through the deposit process and help them start playing.',
      icon: <AccountBalanceWalletIcon />
    },
    {
      label: 'Monitor and View your Players Transaction',
      description: "Track your players' activities and earnings in real-time.",
      icon: <MonitorIcon />
    }
  ];

  return (
    <Container maxWidth="lg" className="affiliate-container">
      {/* Hero Section */}
      <Box className="hero-section" sx={{ textAlign: 'center', py: { xs: 3, md: 6 } }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            mb: { xs: 1.5, md: 2 }, 
            color: 'white',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
          }}
        >
          <span className="gradient-text">UP TO</span> <span className="highlight-text">50%</span> <span className="gradient-text">AGENT COMMISSION</span>
        </Typography>
        
        <StepperBox>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={3} className="step-paper" sx={{ position: 'relative' }}>
                  <StepNumberAvatar>{index + 1}</StepNumberAvatar>
                  <Box className="step-content" sx={{ pt: { xs: 1.5, md: 2 } }}>
                    <Box className="step-icon">
                      {step.icon}
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold" 
                      sx={{ 
                        mt: { xs: 1, md: 2 }, 
                        color: 'white',
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }}
                    >
                      {step.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1, 
                        color: 'white',
                        fontSize: { xs: '0.8rem', md: '0.875rem' }
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </StepperBox>
        
        <Button
          variant="contained" 
          size="large" 
          onClick={handleRegister}
          sx={{ 
            mt: { xs: 2, md: 4 }, 
            fontSize: { xs: '1rem', md: '1.2rem' }, 
            backgroundColor: SYSTEM_COLOR, 
            color: 'white',
            borderRadius: '50px',
            padding: { xs: '10px 20px', md: '12px 30px' },
            fontWeight: 'bold',
            width: { xs: '100%', sm: '280px' },
            maxWidth: '100%',
            '&:hover': {
              backgroundColor: SYSTEM_COLOR_DARK,
            }
          }}
        >
          REGISTER AS AN AGENT!
        </Button>
      </Box>

      <Divider sx={{ my: { xs: 3, md: 6 } }} />
      
      {/* Affiliate Program Vision & Mission */}
      <Typography 
        variant="h3" 
        component="h2" 
        sx={{ 
          textAlign: 'center', 
          mb: { xs: 2, md: 4 }, 
          color: 'white',
          fontSize: { xs: '1.8rem', md: '2.5rem' }
        }}
      >
        Affiliate Program
      </Typography>
      
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Paper elevation={3} className="vision-mission-paper">
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={6}>
              <Box className="vision-box">
                <Box className="icon-container">
                  <LightbulbIcon fontSize="large" sx={{ color: 'white' }} />
                </Box>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    mb: 1
                  }}
                >
                  VISION
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  To Partner with the BEST and BIG AGENTS in the Philippine Gaming Industry
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="mission-box">
                <Box className="icon-container">
                  <TrackChangesIcon fontSize="large" sx={{ color: 'white' }} />
                </Box>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    mb: 1
                  }}
                >
                  MISSION
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  To Provide an Agent Program that caters to a variety of different product online gaming which is both reputable and credible in online entertainment and drive players' loyalty
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      {/* Features */}
      <Box sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={6} sm={6} md={3}>
            <FeatureCard>
              <IconWrapper>
                <SupportAgentIcon fontSize="large" sx={{ color: 'white' }} />
              </IconWrapper>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1, 
                  color: 'white',
                  fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem' },
                  textAlign: 'center',
                  lineHeight: 1.3
                }}
              >
                BEST 24/7 CHAT SUPPORT
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <FeatureCard>
              <IconWrapper>
                <PaymentsIcon fontSize="large" sx={{ color: 'white' }} />
              </IconWrapper>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1, 
                  color: 'white',
                  fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem' },
                  textAlign: 'center',
                  lineHeight: 1.3
                }}
              >
                FAST AND RELIABLE PAYMENT SOLUTIONS
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <FeatureCard>
              <IconWrapper>
                <AccessTimeIcon fontSize="large" sx={{ color: 'white' }} />
              </IconWrapper>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1, 
                  color: 'white',
                  fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem' },
                  textAlign: 'center',
                  lineHeight: 1.3
                }}
              >
                REAL-TIME TRANSACTION
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <FeatureCard>
              <IconWrapper>
                <VerifiedUserIcon fontSize="large" sx={{ color: 'white' }} />
              </IconWrapper>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 1, 
                  color: 'white',
                  fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem' },
                  textAlign: 'center',
                  lineHeight: 1.3
                }}
              >
                FAIR AND HONEST
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Box>
      
      {/* What can you get? */}
      <Box sx={{ mt: { xs: 4, md: 6 }, mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h4" 
          component="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 2, md: 4 }, 
            color: 'white',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          What can you get?
        </Typography>
        
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Card className="benefit-card">
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    mb: { xs: 1, md: 2 }, 
                    color: '#ffcc00',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Up to 50% Commission
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Earn up to 50% commission on all players you refer to our platform. The more players you bring, the higher your earnings!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card className="benefit-card">
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    mb: { xs: 1, md: 2 }, 
                    color: '#ffcc00',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Daily Payouts
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Get your commission paid out daily. No waiting for monthly payments - earn today, get paid tomorrow!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card className="benefit-card">
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    mb: { xs: 1, md: 2 }, 
                    color: '#ffcc00',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Real-time Tracking
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Monitor your referrals and earnings in real-time with our advanced tracking system. Always know exactly how much you've earned.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card className="benefit-card">
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    mb: { xs: 1, md: 2 }, 
                    color: '#ffcc00',
                    fontSize: { xs: '1.2rem', md: '1.5rem' }
                  }}
                >
                  Dedicated Support
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Get access to our dedicated affiliate support team that will help you maximize your earnings and resolve any issues quickly.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Login Section */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography 
          variant="h4" 
          component="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 2, md: 4 }, 
            color: 'white',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          Affiliate Login
        </Typography>
        
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={6}>
            <Card className="login-card">
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <form onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                    InputProps={{
                      style: { color: 'white' }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                    InputProps={{
                      style: { color: 'white' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  <Box sx={{ mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{ 
                        backgroundColor: SYSTEM_COLOR, 
                        color: 'white',
                        borderRadius: '50px',
                        padding: { xs: '10px', md: '12px' },
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        '&:hover': {
                          backgroundColor: SYSTEM_COLOR_DARK,
                        }
                      }}
                    >
                      LOGIN
                    </Button>
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between', 
                        mt: 2,
                        gap: { xs: 1, sm: 0 }
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        Not an Affiliate yet? <Link to="/affiliate/register" style={{ color: SYSTEM_COLOR }}>Sign Up</Link>
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        <Link to="/affiliate/forgot-password" style={{ color: SYSTEM_COLOR }}>Forgot Password?</Link>
                      </Typography>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AffiliateProgram; 