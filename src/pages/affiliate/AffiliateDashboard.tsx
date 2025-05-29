import React, { useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import '../../styles/affiliate/AffiliateDashboard.css';

// Define the system's orange/amber color as a constant
const SYSTEM_COLOR = '#ff9a00';
const SYSTEM_COLOR_DARK = '#ffb340';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`affiliate-tabpanel-${index}`}
      aria-labelledby={`affiliate-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#1a1a2e',
  borderRadius: '10px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: SYSTEM_COLOR,
  color: 'white',
  borderRadius: '50px',
  padding: '10px 20px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: SYSTEM_COLOR_DARK,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#1a1a2e',
  marginBottom: '16px',
}));

// Mock data for charts
const earningsData = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 2780 },
  { name: 'May', earnings: 1890 },
  { name: 'Jun', earnings: 2390 },
  { name: 'Jul', earnings: 3490 },
];

const referralsData = [
  { name: 'Jan', referrals: 10 },
  { name: 'Feb', referrals: 15 },
  { name: 'Mar', referrals: 12 },
  { name: 'Apr', referrals: 8 },
  { name: 'May', referrals: 20 },
  { name: 'Jun', referrals: 17 },
  { name: 'Jul', referrals: 22 },
];

// Mock data for referrals table
const referrals = [
  { id: 1, username: 'player123', date: '2023-07-15', status: 'active', earnings: 250 },
  { id: 2, username: 'gambler456', date: '2023-07-14', status: 'active', earnings: 180 },
  { id: 3, username: 'winner789', date: '2023-07-12', status: 'inactive', earnings: 120 },
  { id: 4, username: 'luckystar', date: '2023-07-10', status: 'active', earnings: 320 },
  { id: 5, username: 'highroller', date: '2023-07-08', status: 'active', earnings: 450 },
];

// Mock data for transactions
const transactions = [
  { id: 1, type: 'Commission', amount: 250, date: '2023-07-15', status: 'completed' },
  { id: 2, type: 'Commission', amount: 180, date: '2023-07-14', status: 'completed' },
  { id: 3, type: 'Withdrawal', amount: -500, date: '2023-07-12', status: 'completed' },
  { id: 4, type: 'Commission', amount: 320, date: '2023-07-10', status: 'completed' },
  { id: 5, type: 'Bonus', amount: 100, date: '2023-07-08', status: 'completed' },
];

const AffiliateDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [referralLink, setReferralLink] = useState('https://mycasino1.com/?ref=AGENT123');
  const [copied, setCopied] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(e.target.value);
  };

  const handleWithdraw = () => {
    console.log('Withdrawing amount:', withdrawAmount);
    // Add withdrawal logic here
    setWithdrawAmount('');
  };

  const handleShare = (platform: string) => {
    const shareText = 'Join MyCasino and get exclusive bonuses! Use my referral link:';
    const shareUrl = referralLink;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="lg" className="affiliate-dashboard-container">
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', color: 'white' }}>
        Affiliate Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ textAlign: 'center' }}>
              <IconWrapper sx={{ margin: '0 auto' }}>
                <MonetizationOnIcon sx={{ fontSize: 30, color: '#ffcc00' }} />
              </IconWrapper>
              <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                ₱12,500
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Earnings
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ textAlign: 'center' }}>
              <IconWrapper sx={{ margin: '0 auto' }}>
                <PeopleIcon sx={{ fontSize: 30, color: '#4caf50' }} />
              </IconWrapper>
              <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                85
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Referrals
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ textAlign: 'center' }}>
              <IconWrapper sx={{ margin: '0 auto' }}>
                <TrendingUpIcon sx={{ fontSize: 30, color: SYSTEM_COLOR }} />
              </IconWrapper>
              <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                50%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Commission Rate
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ textAlign: 'center' }}>
              <IconWrapper sx={{ margin: '0 auto' }}>
                <AccountBalanceWalletIcon sx={{ fontSize: 30, color: SYSTEM_COLOR }} />
              </IconWrapper>
              <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                ₱5,200
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Balance
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Referral Link */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          Your Referral Link
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={referralLink}
            InputProps={{
              readOnly: true,
              style: { color: 'white' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyLink} sx={{ color: 'white' }}>
                    {copied ? <CheckCircleIcon color="success" /> : <ContentCopyIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, mb: { xs: 2, md: 0 } }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="primary" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: SYSTEM_COLOR }}>
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: SYSTEM_COLOR }}>
              <WhatsAppIcon />
            </IconButton>
            <IconButton color="primary" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: SYSTEM_COLOR }}>
              <TelegramIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={3} sx={{ mb: 4, backgroundColor: '#1a1a2e', borderRadius: '10px' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="affiliate dashboard tabs"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': { color: 'rgba(255, 255, 255, 0.7)' },
            '& .Mui-selected': { color: SYSTEM_COLOR },
            '& .MuiTabs-indicator': { backgroundColor: SYSTEM_COLOR },
          }}
        >
          <Tab label="Overview" />
          <Tab label="Referrals" />
          <Tab label="Transactions" />
          <Tab label="Withdraw" />
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Earnings (Last 7 Months)
              </Typography>
              <Paper sx={{ p: 2, height: 300, backgroundColor: '#0f0f1e' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={earningsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
                    <Legend />
                    <Line type="monotone" dataKey="earnings" stroke={SYSTEM_COLOR} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Referrals (Last 7 Months)
              </Typography>
              <Paper sx={{ p: 2, height: 300, backgroundColor: '#0f0f1e' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={referralsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
                    <Legend />
                    <Bar dataKey="referrals" fill={SYSTEM_COLOR} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Referrals Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Your Referrals
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#0f0f1e' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Username</TableCell>
                  <TableCell sx={{ color: 'white' }}>Registration Date</TableCell>
                  <TableCell sx={{ color: 'white' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white' }}>Earnings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell sx={{ color: 'white' }}>{referral.id}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{referral.username}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{referral.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={referral.status}
                        color={referral.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>₱{referral.earnings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Transactions Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Transaction History
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#0f0f1e' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Type</TableCell>
                  <TableCell sx={{ color: 'white' }}>Amount</TableCell>
                  <TableCell sx={{ color: 'white' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell sx={{ color: 'white' }}>{transaction.id}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{transaction.type}</TableCell>
                    <TableCell sx={{ color: transaction.amount >= 0 ? '#4caf50' : '#f44336' }}>
                      {transaction.amount >= 0 ? '+' : ''}₱{transaction.amount}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>{transaction.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status}
                        color={transaction.status === 'completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Withdraw Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Withdraw Funds
              </Typography>
              <Paper sx={{ p: 3, backgroundColor: '#0f0f1e' }}>
                <Typography variant="body2" paragraph>
                  Available Balance: <strong>₱5,200</strong>
                </Typography>
                <TextField
                  fullWidth
                  label="Amount to Withdraw"
                  type="number"
                  value={withdrawAmount}
                  onChange={handleWithdrawChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                  }}
                  sx={{ mb: 3 }}
                />
                <StyledButton 
                  fullWidth 
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > 5200}
                >
                  Request Withdrawal
                </StyledButton>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Withdrawal Information
              </Typography>
              <Paper sx={{ p: 3, backgroundColor: '#0f0f1e' }}>
                <Typography variant="body2" paragraph>
                  <strong>Payment Method:</strong> Bank Transfer
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Bank Name:</strong> BDO
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Account Number:</strong> **** **** **** 1234
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Account Name:</strong> John Doe
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" paragraph>
                  <strong>Minimum Withdrawal:</strong> ₱1,000
                </Typography>
                <Typography variant="body2">
                  <strong>Processing Time:</strong> 1-2 business days
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AffiliateDashboard; 