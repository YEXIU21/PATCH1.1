import React, { useState } from 'react';
import '../../styles/admin/AdminDashboard.css';
import '../../styles/admin/SlotsManagement.css';

// Import icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CategoryIcon from '@mui/icons-material/Category';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import CasinoIcon from '@mui/icons-material/Casino';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Sample data for slot games
const initialSlots = [
  {
    id: 1,
    name: 'Lucky Dragon',
    provider: 'Microgaming',
    category: 'Video Slots',
    rtp: 96.5,
    volatility: 'Medium',
    paylines: 25,
    reels: 5,
    minBet: 0.25,
    maxBet: 100,
    featured: true,
    active: true,
    image: 'lucky-dragon.jpg',
  },
  {
    id: 2,
    name: 'Golden Pharaoh',
    provider: 'NetEnt',
    category: 'Classic Slots',
    rtp: 95.8,
    volatility: 'Low',
    paylines: 10,
    reels: 3,
    minBet: 0.10,
    maxBet: 50,
    featured: true,
    active: true,
    image: 'golden-pharaoh.jpg',
  },
  {
    id: 3,
    name: 'Space Adventure',
    provider: 'Playtech',
    category: 'Video Slots',
    rtp: 97.2,
    volatility: 'High',
    paylines: 30,
    reels: 5,
    minBet: 0.50,
    maxBet: 200,
    featured: false,
    active: true,
    image: 'space-adventure.jpg',
  },
  {
    id: 4,
    name: 'Fruit Fiesta',
    provider: 'Betsoft',
    category: 'Classic Slots',
    rtp: 94.5,
    volatility: 'Low',
    paylines: 5,
    reels: 3,
    minBet: 0.05,
    maxBet: 25,
    featured: false,
    active: true,
    image: 'fruit-fiesta.jpg',
  },
  {
    id: 5,
    name: 'Mystic Forest',
    provider: 'Pragmatic Play',
    category: 'Video Slots',
    rtp: 96.8,
    volatility: 'Medium',
    paylines: 20,
    reels: 5,
    minBet: 0.20,
    maxBet: 100,
    featured: false,
    active: false,
    image: 'mystic-forest.jpg',
  },
  {
    id: 6,
    name: 'Diamond Jackpot',
    provider: 'Microgaming',
    category: 'Jackpot Slots',
    rtp: 93.5,
    volatility: 'High',
    paylines: 15,
    reels: 5,
    minBet: 1.00,
    maxBet: 500,
    featured: true,
    active: true,
    image: 'diamond-jackpot.jpg',
  },
];

// Sample data for slot providers
const slotProviders = [
  'Microgaming',
  'NetEnt',
  'Playtech',
  'Betsoft',
  'Pragmatic Play',
  'Play\'n GO',
  'Yggdrasil',
  'Red Tiger',
];

// Sample data for slot categories
const slotCategories = [
  'Video Slots',
  'Classic Slots',
  'Jackpot Slots',
  'Megaways',
  '3D Slots',
];

// Sample data for volatility options
const volatilityOptions = [
  'Low',
  'Medium',
  'High',
];

const SlotsManagement: React.FC = () => {
  const [slots, setSlots] = useState(initialSlots);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  
  const [newSlot, setNewSlot] = useState({
    name: '',
    provider: '',
    category: '',
    rtp: 95.0,
    volatility: 'Medium',
    paylines: 20,
    reels: 5,
    minBet: 0.10,
    maxBet: 100,
    featured: false,
    active: true,
    image: '',
  });

  // Filter and sort slots
  const filteredSlots = slots.filter(slot => {
    const matchesSearch = slot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         slot.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = filterProvider ? slot.provider === filterProvider : true;
    const matchesCategory = filterCategory ? slot.category === filterCategory : true;
    const matchesStatus = filterStatus === 'active' ? slot.active :
                         filterStatus === 'inactive' ? !slot.active :
                         true;
    
    return matchesSearch && matchesProvider && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'provider') {
      comparison = a.provider.localeCompare(b.provider);
    } else if (sortBy === 'category') {
      comparison = a.category.localeCompare(b.category);
    } else if (sortBy === 'rtp') {
      comparison = a.rtp - b.rtp;
    } else if (sortBy === 'paylines') {
      comparison = a.paylines - b.paylines;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Handle toggle featured status
  const handleToggleFeatured = (id: number) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, featured: !slot.featured } : slot
    ));
  };

  // Handle toggle active status
  const handleToggleActive = (id: number) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, active: !slot.active } : slot
    ));
  };

  // Handle delete slot
  const handleDeleteSlot = (id: number) => {
    if (window.confirm('Are you sure you want to delete this slot game?')) {
      setSlots(slots.filter(slot => slot.id !== id));
    }
  };

  // Handle sort change
  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Handle add new slot
  const handleAddSlot = () => {
    const newId = Math.max(...slots.map(slot => slot.id)) + 1;
    
    setSlots([
      ...slots,
      {
        ...newSlot,
        id: newId,
      },
    ]);
    
    setNewSlot({
      name: '',
      provider: '',
      category: '',
      rtp: 95.0,
      volatility: 'Medium',
      paylines: 20,
      reels: 5,
      minBet: 0.10,
      maxBet: 100,
      featured: false,
      active: true,
      image: '',
    });
    
    setShowAddForm(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Slots Management</h1>
      <p className="section-description">Manage slot games, categories, and provider integrations</p>
      
      <div className="slots-container">
        <div className="slots-header">
          <div className="search-filter-container">
            <div className="slots-search">
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Search slots..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              className={`filter-button ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterListIcon /> Filters
            </button>
            
            <div className="view-toggle">
              <button 
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <GridViewIcon />
              </button>
              <button 
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <ViewListIcon />
              </button>
            </div>
          </div>
          
          <button 
            className="add-slot-button"
            onClick={() => {
              setShowAddForm(true);
              setEditingSlot(null);
            }}
          >
            <AddIcon /> Add New Slot
          </button>
        </div>
        
        {showFilters && (
          <div className="filter-container">
            <div className="filter-group">
              <label>Provider</label>
              <select 
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
              >
                <option value="">All Providers</option>
                {slotProviders.map((provider, index) => (
                  <option key={index} value={provider}>{provider}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {slotCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Status</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <button 
              className="clear-filters"
              onClick={() => {
                setFilterProvider('');
                setFilterCategory('');
                setFilterStatus('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {showAddForm && (
          <div className="slot-form">
            <h3>Add New Slot Game</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Slot Name</label>
                <input 
                  type="text" 
                  value={newSlot.name}
                  onChange={(e) => setNewSlot({...newSlot, name: e.target.value})}
                  placeholder="Enter slot name"
                />
              </div>
              
              <div className="form-group">
                <label>Image</label>
                <input 
                  type="file" 
                  className="file-input"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewSlot({...newSlot, image: e.target.files[0].name});
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Provider</label>
                <select 
                  value={newSlot.provider}
                  onChange={(e) => setNewSlot({...newSlot, provider: e.target.value})}
                >
                  <option value="">Select Provider</option>
                  {slotProviders.map((provider, index) => (
                    <option key={index} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newSlot.category}
                  onChange={(e) => setNewSlot({...newSlot, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {slotCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>RTP (%)</label>
                <input 
                  type="number" 
                  value={newSlot.rtp}
                  onChange={(e) => setNewSlot({...newSlot, rtp: parseFloat(e.target.value)})}
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              
              <div className="form-group">
                <label>Volatility</label>
                <select 
                  value={newSlot.volatility}
                  onChange={(e) => setNewSlot({...newSlot, volatility: e.target.value})}
                >
                  {volatilityOptions.map((volatility, index) => (
                    <option key={index} value={volatility}>{volatility}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Paylines</label>
                <input 
                  type="number" 
                  value={newSlot.paylines}
                  onChange={(e) => setNewSlot({...newSlot, paylines: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
              
              <div className="form-group">
                <label>Reels</label>
                <input 
                  type="number" 
                  value={newSlot.reels}
                  onChange={(e) => setNewSlot({...newSlot, reels: parseInt(e.target.value)})}
                  min="3"
                  max="7"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Minimum Bet</label>
                <div className="input-with-icon">
                  <AttachMoneyIcon />
                  <input 
                    type="number" 
                    value={newSlot.minBet}
                    onChange={(e) => setNewSlot({...newSlot, minBet: parseFloat(e.target.value)})}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Maximum Bet</label>
                <div className="input-with-icon">
                  <AttachMoneyIcon />
                  <input 
                    type="number" 
                    value={newSlot.maxBet}
                    onChange={(e) => setNewSlot({...newSlot, maxBet: parseFloat(e.target.value)})}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-row checkbox-row">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  id="featured-check" 
                  checked={newSlot.featured}
                  onChange={(e) => setNewSlot({...newSlot, featured: e.target.checked})}
                />
                <label htmlFor="featured-check">Featured Game</label>
              </div>
              
              <div className="form-check">
                <input 
                  type="checkbox" 
                  id="active-check" 
                  checked={newSlot.active}
                  onChange={(e) => setNewSlot({...newSlot, active: e.target.checked})}
                />
                <label htmlFor="active-check">Active</label>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button 
                className="save-button"
                onClick={handleAddSlot}
                disabled={!newSlot.name || !newSlot.provider || !newSlot.category}
              >
                Save Slot
              </button>
            </div>
          </div>
        )}
        
        {viewMode === 'grid' ? (
          <div className="slots-grid">
            {filteredSlots.length > 0 ? (
              filteredSlots.map(slot => (
                <div key={slot.id} className={`slot-card ${!slot.active ? 'inactive' : ''}`}>
                  <div className="slot-card-header">
                    <div className="slot-category">
                      <CategoryIcon /> {slot.category}
                    </div>
                    <div className="slot-actions">
                      <button 
                        className={`feature-toggle ${slot.featured ? 'featured' : ''}`}
                        onClick={() => handleToggleFeatured(slot.id)}
                        title={slot.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        {slot.featured ? <StarIcon /> : <StarBorderIcon />}
                      </button>
                      <button 
                        className={`status-toggle ${slot.active ? 'active' : 'inactive'}`}
                        onClick={() => handleToggleActive(slot.id)}
                        title={slot.active ? 'Deactivate slot' : 'Activate slot'}
                      >
                        {slot.active ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="slot-image" 
                    style={{ backgroundImage: `url(/images/slots/${slot.image})` }}
                  ></div>
                  
                  <div className="slot-info">
                    <h3 className="slot-name">{slot.name}</h3>
                    <p className="slot-provider">{slot.provider}</p>
                    
                    <div className="slot-details">
                      <div className="slot-detail">
                        <span className="detail-label">RTP:</span>
                        <span className="detail-value">{slot.rtp}%</span>
                      </div>
                      <div className="slot-detail">
                        <span className="detail-label">Volatility:</span>
                        <span className="detail-value">{slot.volatility}</span>
                      </div>
                      <div className="slot-detail">
                        <span className="detail-label">Paylines:</span>
                        <span className="detail-value">{slot.paylines}</span>
                      </div>
                      <div className="slot-detail">
                        <span className="detail-label">Reels:</span>
                        <span className="detail-value">{slot.reels}</span>
                      </div>
                      <div className="slot-detail">
                        <span className="detail-label">Bet Range:</span>
                        <span className="detail-value">${slot.minBet} - ${slot.maxBet}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="slot-card-footer">
                    <button 
                      className="edit-button"
                      onClick={() => setEditingSlot(slot.id)}
                    >
                      <EditIcon /> Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteSlot(slot.id)}
                    >
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-slots">
                <CasinoIcon />
                <p>No slot games found. Try adjusting your filters or add a new slot game.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="slots-table-container">
            <table className="slots-table">
              <thead>
                <tr>
                  <th onClick={() => handleSortChange('name')} className="sortable-column">
                    Slot Name {sortBy === 'name' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                  </th>
                  <th onClick={() => handleSortChange('provider')} className="sortable-column">
                    Provider {sortBy === 'provider' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                  </th>
                  <th onClick={() => handleSortChange('category')} className="sortable-column">
                    Category {sortBy === 'category' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                  </th>
                  <th onClick={() => handleSortChange('rtp')} className="sortable-column">
                    RTP {sortBy === 'rtp' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                  </th>
                  <th>Volatility</th>
                  <th onClick={() => handleSortChange('paylines')} className="sortable-column">
                    Paylines {sortBy === 'paylines' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                  </th>
                  <th>Bet Range</th>
                  <th>Featured</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSlots.length > 0 ? (
                  filteredSlots.map(slot => (
                    <tr key={slot.id}>
                      <td>
                        <div className="slot-name-cell">
                          <div className="slot-image-thumbnail" style={{ backgroundImage: `url(/images/slots/${slot.image})` }}></div>
                          <span>{slot.name}</span>
                        </div>
                      </td>
                      <td>{slot.provider}</td>
                      <td>
                        <span className="slot-category-badge">
                          {slot.category}
                        </span>
                      </td>
                      <td>{slot.rtp}%</td>
                      <td>{slot.volatility}</td>
                      <td>{slot.paylines}</td>
                      <td>${slot.minBet} - ${slot.maxBet}</td>
                      <td>
                        <button 
                          className={`feature-toggle ${slot.featured ? 'featured' : ''}`}
                          onClick={() => handleToggleFeatured(slot.id)}
                          title={slot.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          {slot.featured ? <StarIcon /> : <StarBorderIcon />}
                        </button>
                      </td>
                      <td>
                        <button 
                          className={`status-toggle ${slot.active ? 'active' : 'inactive'}`}
                          onClick={() => handleToggleActive(slot.id)}
                          title={slot.active ? 'Deactivate slot' : 'Activate slot'}
                        >
                          {slot.active ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          <span>{slot.active ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="action-button edit"
                            onClick={() => setEditingSlot(slot.id)}
                            title="Edit slot"
                          >
                            <EditIcon />
                          </button>
                          <button 
                            className="action-button delete"
                            onClick={() => handleDeleteSlot(slot.id)}
                            title="Delete slot"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="no-slots-row">
                      No slot games found. Try adjusting your filters or add a new slot game.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotsManagement; 