import React, { useState } from 'react';
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Checkbox,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../../styles/affiliate/AffiliateRegistration.css';

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

const AffiliateRegistration = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    city: '',
    address: '',
    referralCode: '',
    agreeTerms: false,
    agreePrivacy: false,
    marketingConsent: false,
    preferredPaymentMethod: 'bank',
    bankName: '',
    accountNumber: '',
    accountName: '',
    gcashNumber: '',
    paymayaNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step: number) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Personal Information
        if (!formData.firstName) {
          newErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName) {
          newErrors.lastName = 'Last name is required';
          isValid = false;
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
          isValid = false;
        }
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
          isValid = false;
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
          isValid = false;
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
          isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
          isValid = false;
        }
        break;
      case 1: // Location Details
        if (!formData.country) {
          newErrors.country = 'Country is required';
          isValid = false;
        }
        if (!formData.city) {
          newErrors.city = 'City is required';
          isValid = false;
        }
        if (!formData.address) {
          newErrors.address = 'Address is required';
          isValid = false;
        }
        break;
      case 2: // Payment Information
        if (formData.preferredPaymentMethod === 'bank') {
          if (!formData.bankName) {
            newErrors.bankName = 'Bank name is required';
            isValid = false;
          }
          if (!formData.accountNumber) {
            newErrors.accountNumber = 'Account number is required';
            isValid = false;
          }
          if (!formData.accountName) {
            newErrors.accountName = 'Account name is required';
            isValid = false;
          }
        } else if (formData.preferredPaymentMethod === 'gcash' && !formData.gcashNumber) {
          newErrors.gcashNumber = 'GCash number is required';
          isValid = false;
        } else if (formData.preferredPaymentMethod === 'paymaya' && !formData.paymayaNumber) {
          newErrors.paymayaNumber = 'PayMaya number is required';
          isValid = false;
        }
        break;
      case 3: // Terms & Conditions
        if (!formData.agreeTerms) {
          newErrors.agreeTerms = 'You must agree to the Terms and Conditions';
          isValid = false;
        }
        if (!formData.agreePrivacy) {
          newErrors.agreePrivacy = 'You must agree to the Privacy Policy';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      console.log('Form submitted:', formData);
      setRegistrationSuccess(true);
      
      // Redirect to success page or affiliate dashboard after registration
      setTimeout(() => {
        navigate('/affiliate');
      }, 3000);
    }
  };

  const steps = [
    {
      label: 'Personal Information',
      description: 'Enter your basic details to get started',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' }
              }}
              InputProps={{
                style: { color: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' }
              }}
              InputProps={{
                style: { color: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' }
              }}
              InputProps={{
                style: { color: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' }
              }}
              InputProps={{
                style: { color: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' }
              }}
              InputProps={{
                style: { color: 'white' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Location Details',
      description: 'Tell us where you are based',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={!!errors.country}
              helperText={errors.country}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              required
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Referral Code (Optional)"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Payment Information',
      description: 'How would you like to receive your commissions?',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Preferred Payment Method</FormLabel>
              <RadioGroup
                name="preferredPaymentMethod"
                value={formData.preferredPaymentMethod}
                onChange={handleChange}
              >
                <FormControlLabel value="bank" control={<Radio />} label="Bank Transfer" />
                <FormControlLabel value="gcash" control={<Radio />} label="GCash" />
                <FormControlLabel value="paymaya" control={<Radio />} label="PayMaya" />
              </RadioGroup>
            </FormControl>
          </Grid>
          
          {formData.preferredPaymentMethod === 'bank' && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  error={!!errors.bankName}
                  helperText={errors.bankName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Name"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  error={!!errors.accountName}
                  helperText={errors.accountName}
                  required
                />
              </Grid>
            </>
          )}
          
          {formData.preferredPaymentMethod === 'gcash' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GCash Number"
                name="gcashNumber"
                value={formData.gcashNumber}
                onChange={handleChange}
                error={!!errors.gcashNumber}
                helperText={errors.gcashNumber}
                required
              />
            </Grid>
          )}
          
          {formData.preferredPaymentMethod === 'paymaya' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PayMaya Number"
                name="paymayaNumber"
                value={formData.paymayaNumber}
                onChange={handleChange}
                error={!!errors.paymayaNumber}
                helperText={errors.paymayaNumber}
                required
              />
            </Grid>
          )}
        </Grid>
      )
    },
    {
      label: 'Terms & Conditions',
      description: 'Review and accept our terms',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  name="agreeTerms"
                  color="primary"
                />
              }
              label={
                <span>
                  I agree to the <MuiLink href="/terms" target="_blank">Terms and Conditions</MuiLink>
                </span>
              }
            />
            {errors.agreeTerms && (
              <Typography color="error" variant="caption">
                {errors.agreeTerms}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  name="agreePrivacy"
                  color="primary"
                />
              }
              label={
                <span>
                  I agree to the <MuiLink href="/privacy" target="_blank">Privacy Policy</MuiLink>
                </span>
              }
            />
            {errors.agreePrivacy && (
              <Typography color="error" variant="caption">
                {errors.agreePrivacy}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                  name="marketingConsent"
                  color="primary"
                />
              }
              label="I would like to receive marketing communications about promotions and offers (Optional)"
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                By registering, you confirm that you are at least 21 years old and that all the information provided is accurate and complete.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )
    }
  ];

  if (registrationSuccess) {
    return (
      <Container maxWidth="sm" className="affiliate-registration-container">
        <Paper elevation={3} className="success-paper">
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Registration Successful!
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
              Thank you for registering as an affiliate. Your application is being reviewed.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'white' }}>
              You will receive a confirmation email shortly with your account details.
            </Typography>
            <Button
              component={Link}
              to="/affiliate"
              variant="contained"
              sx={{ 
                mt: 2, 
                backgroundColor: SYSTEM_COLOR,
                color: 'white',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: SYSTEM_COLOR_DARK,
                }
              }}
            >
              Go to Affiliate Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="affiliate-registration-container">
      <Paper elevation={3} className="registration-paper">
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'white' }}>
            Become an Affiliate
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4, color: 'white' }}>
            Join our affiliate program and earn up to 50% commission
          </Typography>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="subtitle1" sx={{ color: 'white' }}>{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 3, color: 'white' }}>
                    {step.description}
                  </Typography>
                  {step.content}
                  <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      variant="outlined"
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button 
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ 
                          backgroundColor: SYSTEM_COLOR,
                          color: 'white',
                          borderRadius: '50px',
                          padding: '12px 30px',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: SYSTEM_COLOR_DARK,
                          }
                        }}
                      >
                        Submit Application
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNext}
                        variant="contained"
                        sx={{ 
                          backgroundColor: SYSTEM_COLOR,
                          color: 'white',
                          borderRadius: '50px',
                          padding: '12px 30px',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: SYSTEM_COLOR_DARK,
                          }
                        }}
                      >
                        Continue
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              Already have an affiliate account? <Link to="/affiliate" style={{ color: SYSTEM_COLOR }}>Login here</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AffiliateRegistration; 