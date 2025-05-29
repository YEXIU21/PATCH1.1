import React, { useState } from 'react';
import '../../styles/admin/AdminDashboard.css';
import '../../styles/admin/ContentManagement.css';

// Import icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';

// Sample data for content items
const initialContent = [
  {
    id: 1,
    title: 'Welcome Banner',
    type: 'banner',
    status: 'published',
    language: 'English',
    lastUpdated: '2023-11-15',
  },
  {
    id: 2,
    title: 'Promotions Carousel',
    type: 'carousel',
    status: 'published',
    language: 'English',
    lastUpdated: '2023-11-10',
  },
  {
    id: 3,
    title: 'About Us Page',
    type: 'page',
    status: 'draft',
    language: 'English',
    lastUpdated: '2023-11-05',
  },
  {
    id: 4,
    title: 'Terms & Conditions',
    type: 'page',
    status: 'published',
    language: 'English',
    lastUpdated: '2023-10-20',
  },
  {
    id: 5,
    title: 'Privacy Policy',
    type: 'page',
    status: 'published',
    language: 'English',
    lastUpdated: '2023-10-20',
  },
  {
    id: 6,
    title: 'New Player Bonus',
    type: 'promotion',
    status: 'scheduled',
    language: 'English',
    lastUpdated: '2023-11-12',
  },
];

const ContentManagement: React.FC = () => {
  const [contentItems, setContentItems] = useState(initialContent);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'page',
    status: 'draft',
    language: 'English',
    content: '',
  });

  // Filter content based on active tab and search term
  const filteredContent = contentItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Handle editing content item
  const handleEditItem = (id: number) => {
    setEditingItem(id);
    setShowAddForm(false);
  };

  // Handle deleting content item
  const handleDeleteItem = (id: number) => {
    if (window.confirm('Are you sure you want to delete this content item?')) {
      setContentItems(contentItems.filter(item => item.id !== id));
    }
  };

  // Handle saving edited item
  const handleSaveItem = () => {
    setEditingItem(null);
  };

  // Handle adding new content item
  const handleAddItem = () => {
    const newId = Math.max(...contentItems.map(item => item.id)) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    setContentItems([
      ...contentItems,
      {
        ...newItem,
        id: newId,
        lastUpdated: currentDate,
      },
    ]);
    
    setNewItem({
      title: '',
      type: 'page',
      status: 'draft',
      language: 'English',
      content: '',
    });
    
    setShowAddForm(false);
  };

  return (
    <div className="admin-dashboard">
      <h1>Content Management</h1>
      <p className="section-description">Manage website content, pages, and promotional materials</p>
      
      <div className="content-management-container">
        <div className="content-header">
          <div className="content-tabs">
            <button 
              className={`content-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <FormatListBulletedIcon /> All
            </button>
            <button 
              className={`content-tab ${activeTab === 'page' ? 'active' : ''}`}
              onClick={() => setActiveTab('page')}
            >
              <TextFieldsIcon /> Pages
            </button>
            <button 
              className={`content-tab ${activeTab === 'banner' ? 'active' : ''}`}
              onClick={() => setActiveTab('banner')}
            >
              <ImageIcon /> Banners
            </button>
            <button 
              className={`content-tab ${activeTab === 'carousel' ? 'active' : ''}`}
              onClick={() => setActiveTab('carousel')}
            >
              <LanguageIcon /> Carousels
            </button>
            <button 
              className={`content-tab ${activeTab === 'promotion' ? 'active' : ''}`}
              onClick={() => setActiveTab('promotion')}
            >
              <TranslateIcon /> Promotions
            </button>
          </div>
          
          <div className="content-actions">
            <div className="content-search">
              <SearchIcon />
              <input 
                type="text" 
                placeholder="Search content..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="add-content-button"
              onClick={() => {
                setShowAddForm(true);
                setEditingItem(null);
              }}
            >
              <AddIcon /> Add Content
            </button>
          </div>
        </div>
        
        {showAddForm && (
          <div className="content-form">
            <h3>Add New Content</h3>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="Enter content title"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select 
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                >
                  <option value="page">Page</option>
                  <option value="banner">Banner</option>
                  <option value="carousel">Carousel</option>
                  <option value="promotion">Promotion</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={newItem.status}
                  onChange={(e) => setNewItem({...newItem, status: e.target.value})}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Language</label>
                <select 
                  value={newItem.language}
                  onChange={(e) => setNewItem({...newItem, language: e.target.value})}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Content</label>
              <textarea 
                value={newItem.content}
                onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                placeholder="Enter content here..."
                rows={8}
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button className="cancel-button" onClick={() => setShowAddForm(false)}>
                <CancelIcon /> Cancel
              </button>
              <button 
                className="save-button"
                onClick={handleAddItem}
                disabled={!newItem.title}
              >
                <SaveIcon /> Save Content
              </button>
            </div>
          </div>
        )}
        
        <div className="content-table-container">
          <table className="content-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Language</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.length > 0 ? (
                filteredContent.map(item => (
                  <tr key={item.id} className={editingItem === item.id ? 'editing' : ''}>
                    <td>{item.title}</td>
                    <td style={{ textAlign: 'center' }}>
                      {item.type === 'banner' ? (
                        <span className="type-banner-label">
                          Banner
                        </span>
                      ) : (
                      <span className={`content-type ${item.type}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`content-status ${item.status}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td>{item.language}</td>
                    <td>{item.lastUpdated}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div className="content-actions-cell">
                      {editingItem === item.id ? (
                        <button className="action-button save" onClick={handleSaveItem}>
                          <SaveIcon />
                        </button>
                      ) : (
                        <button className="action-button edit" onClick={() => handleEditItem(item.id)}>
                          <EditIcon />
                        </button>
                      )}
                      <button className="action-button delete" onClick={() => handleDeleteItem(item.id)}>
                        <DeleteIcon />
                      </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-content">
                    No content items found. Try adjusting your filters or add new content.
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

export default ContentManagement; 