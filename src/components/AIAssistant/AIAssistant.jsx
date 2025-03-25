import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import CategoryCard from './CategoryCard';
import configIcon from '../../assets/icons/configuration.svg';
import consolidationIcon from '../../assets/icons/consolidation.svg';
import troubleshootingIcon from '../../assets/icons/troubleshooting-logo.svg';
import './AIAssistant.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';


const AIAssistant = () => {
  const user = useSelector(selectUser);
  
  const categories = [
    {
      id: 'configuration',
      title: 'Configuration Item',
      icon: configIcon,
      path: `/${user?.email ? user?.email : "user"}/configuration`
    },
    {
      id: 'rca',
      title: 'RCA consolidation',
      icon: consolidationIcon,
      path: `/${user?.email ? user?.email : "user"}/rca-consolidation`
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: troubleshootingIcon,
      path: `/${user?.email ? user?.email : "user"}/troubleshooting`
    },
  ];
  
  const navigate = useNavigate();

  const handleCategorySelect = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <h1 className="title">AI Enabled Platform Assistant</h1>
        <h2 className="subtitle">How may I help you?</h2>
        
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              onClick={() => handleCategorySelect(category.path)}
            />
          ))}
        </div>
        
        <p className="helper-text">
          Select the relevant category for me to assist you better!
        </p>
      </main>
    </div>
  );
};

export default AIAssistant;