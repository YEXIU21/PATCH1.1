import React, { useState } from 'react';
import '../../styles/admin/AdminDashboard.css';
import '../../styles/admin/CasinoGamesManagement.css';

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
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';

// Sample data for casino games
const initialGames = [
  {
    id: 1,
    name: 'Blackjack Pro',
    provider: 'Evolution Gaming',
    category: 'Table Games',
    minBet: 5,
    maxBet: 1000,
    rtp: 99.5,
    featured: true,
    active: true,
    image: 'blackjack-pro.jpg',
  },
  {
    id: 2,
    name: 'European Roulette',
    provider: 'Pragmatic Play',
    category: 'Table Games',
    minBet: 1,
    maxBet: 500,
    rtp: 97.3,
    featured: true,
    active: true,
    image: 'european-roulette.jpg',
  },
  {
    id: 3,
    name: 'Baccarat Squeeze',
    provider: 'Evolution Gaming',
    category: 'Table Games',
    minBet: 10,
    maxBet: 2000,
    rtp: 98.9,
    featured: false,
    active: true,
    image: 'baccarat-squeeze.jpg',
  },
  {
    id: 4,
    name: 'Caribbean Stud Poker',
    provider: 'NetEnt',
    category: 'Poker',
    minBet: 5,
    maxBet: 500,
    rtp: 94.8,
    featured: false,
    active: true,
    image: 'caribbean-stud-poker.jpg',
  },
  {
    id: 5,
    name: 'Casino Hold\'em',
    provider: 'Playtech',
    category: 'Poker',
    minBet: 5,
    maxBet: 1000,
    rtp: 97.8,
    featured: false,
    active: false,
    image: 'casino-holdem.jpg',
  },
  {
    id: 6,
    name: 'Sic Bo',
    provider: 'Ezugi',
    category: 'Specialty',
    minBet: 1,
    maxBet: 500,
    rtp: 97.2,
    featured: false,
    active: true,
    image: 'sic-bo.jpg',
  },
];

// Sample data for game providers
const gameProviders = [
  'Evolution Gaming',
  'Pragmatic Play',
  'NetEnt',
  'Playtech',
  'Ezugi',
  'Microgaming',
  'Betsoft',
  'Play\'n GO',
];

// Sample data for game categories
const gameCategories = [
  'Table Games',
  'Poker',
  'Specialty',
  'Game Shows',
  'VIP Tables',
];

const CasinoGamesManagement: React.FC = () => {
  const [games, setGames] = useState(initialGames);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGame, setEditingGame] = useState<number | null>(null);
  
  const [newGame, setNewGame] = useState({
    name: '',
    provider: '',
    category: '',
    minBet: 1,
    maxBet: 100,
    rtp: 95,
    featured: false,
    active: true,
    image: '',
  });

  // Filter and sort games
  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = filterProvider ? game.provider === filterProvider : true;
    const matchesCategory = filterCategory ? game.category === filterCategory : true;
    const matchesStatus = filterStatus === 'active' ? game.active :
                         filterStatus === 'inactive' ? !game.active :
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
    } else if (sortBy === 'minBet') {
      comparison = a.minBet - b.minBet;
    } else if (sortBy === 'maxBet') {
      comparison = a.maxBet - b.maxBet;
    } else if (sortBy === 'rtp') {
      comparison = a.rtp - b.rtp;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Handle toggle featured status
  const handleToggleFeatured = (id: number) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, featured: !game.featured } : game
    ));
  };

  // Handle toggle active status
  const handleToggleActive = (id: number) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, active: !game.active } : game
    ));
  };

  // Handle delete game
  const handleDeleteGame = (id: number) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      setGames(games.filter(game => game.id !== id));
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

  // Handle add new game
  const handleAddGame = () => {
    const newId = Math.max(...games.map(game => game.id)) + 1;
    
    setGames([
      ...games,
      {
        ...newGame,
        id: newId,
      },
    ]);
    
    setNewGame({
      name: '',
      provider: '',
      category: '',
      minBet: 1,
      maxBet: 100,
      rtp: 95,
      featured: false,
      active: true,
      image: '',
    });
    
    setShowAddForm(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Casino Games Management</h1>
      <p className="section-description">Manage live dealer casino games, table games, and specialty games</p>
      
      <div className="casino-games-container">
        <div className="games-header">
          <div className="search-filter-container">
            <div className="games-search">
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Search games..." 
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
          </div>
          
          <button 
            className="add-game-button"
            onClick={() => {
              setShowAddForm(true);
              setEditingGame(null);
            }}
          >
            <AddIcon /> Add New Game
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
                {gameProviders.map((provider, index) => (
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
                {gameCategories.map((category, index) => (
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
          <div className="game-form">
            <h3>Add New Casino Game</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Game Name</label>
                <input 
                  type="text" 
                  value={newGame.name}
                  onChange={(e) => setNewGame({...newGame, name: e.target.value})}
                  placeholder="Enter game name"
                />
              </div>
              
              <div className="form-group">
                <label>Image</label>
                <input 
                  type="file" 
                  className="file-input"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewGame({...newGame, image: e.target.files[0].name});
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Provider</label>
                <select 
                  value={newGame.provider}
                  onChange={(e) => setNewGame({...newGame, provider: e.target.value})}
                >
                  <option value="">Select Provider</option>
                  {gameProviders.map((provider, index) => (
                    <option key={index} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newGame.category}
                  onChange={(e) => setNewGame({...newGame, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {gameCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Minimum Bet</label>
                <div className="input-with-icon">
                  <AttachMoneyIcon />
                  <input 
                    type="number" 
                    value={newGame.minBet}
                    onChange={(e) => setNewGame({...newGame, minBet: parseInt(e.target.value)})}
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
                    value={newGame.maxBet}
                    onChange={(e) => setNewGame({...newGame, maxBet: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>RTP (%)</label>
                <div className="input-with-icon">
                  <PercentIcon />
                  <input 
                    type="number" 
                    value={newGame.rtp}
                    onChange={(e) => setNewGame({...newGame, rtp: parseFloat(e.target.value)})}
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-row checkbox-row">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  id="featured-check" 
                  checked={newGame.featured}
                  onChange={(e) => setNewGame({...newGame, featured: e.target.checked})}
                />
                <label htmlFor="featured-check">Featured Game</label>
              </div>
              
              <div className="form-check">
                <input 
                  type="checkbox" 
                  id="active-check" 
                  checked={newGame.active}
                  onChange={(e) => setNewGame({...newGame, active: e.target.checked})}
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
                onClick={handleAddGame}
                disabled={!newGame.name || !newGame.provider || !newGame.category}
              >
                Save Game
              </button>
            </div>
          </div>
        )}
        
        <div className="games-table-container">
          <table className="games-table">
            <thead>
              <tr>
                <th onClick={() => handleSortChange('name')} className="sortable-column">
                  Game Name {sortBy === 'name' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                </th>
                <th onClick={() => handleSortChange('provider')} className="sortable-column">
                  Provider {sortBy === 'provider' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                </th>
                <th onClick={() => handleSortChange('category')} className="sortable-column">
                  Category {sortBy === 'category' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                </th>
                <th onClick={() => handleSortChange('minBet')} className="sortable-column">
                  Min Bet {sortBy === 'minBet' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                </th>
                <th onClick={() => handleSortChange('maxBet')} className="sortable-column">
                  Max Bet {sortBy === 'maxBet' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                </th>
                <th onClick={() => handleSortChange('rtp')} className="sortable-column">
                  RTP {sortBy === 'rtp' && <SortIcon className={sortOrder === 'asc' ? '' : 'desc'} />}
                </th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.length > 0 ? (
                filteredGames.map(game => (
                  <tr key={game.id}>
                    <td>
                      <div className="game-name-cell">
                        <div className="game-image-thumbnail" style={{ backgroundImage: `url(/images/games/${game.image})` }}></div>
                        <span>{game.name}</span>
                      </div>
                    </td>
                    <td>{game.provider}</td>
                    <td>
                      <span className="game-category-badge">
                        <CategoryIcon /> {game.category}
                      </span>
                    </td>
                    <td>${game.minBet}</td>
                    <td>${game.maxBet}</td>
                    <td>{game.rtp}%</td>
                    <td>
                      <button 
                        className={`feature-toggle ${game.featured ? 'featured' : ''}`}
                        onClick={() => handleToggleFeatured(game.id)}
                        title={game.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        {game.featured ? <StarIcon /> : <StarBorderIcon />}
                      </button>
                    </td>
                    <td>
                      <button 
                        className={`status-toggle ${game.active ? 'active' : 'inactive'}`}
                        onClick={() => handleToggleActive(game.id)}
                        title={game.active ? 'Deactivate game' : 'Activate game'}
                      >
                        {game.active ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        <span>{game.active ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="action-button edit"
                          onClick={() => setEditingGame(game.id)}
                          title="Edit game"
                        >
                          <EditIcon />
                        </button>
                        <button 
                          className="action-button delete"
                          onClick={() => handleDeleteGame(game.id)}
                          title="Delete game"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="no-games">
                    No games found. Try adjusting your filters or add a new game.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CasinoGamesManagement; 