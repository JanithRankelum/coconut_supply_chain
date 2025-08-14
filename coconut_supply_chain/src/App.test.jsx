import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders homepage link', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if "Home" link is in the document
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('navigates to Supply Chain page when link is clicked', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Click the "Supply Chain" link
    const supplyChainLink = screen.getByText(/supply chain/i);
    fireEvent.click(supplyChainLink);

    // Check if Supply Chain page is displayed
    const supplyChainHeading = screen.getByText(/supply chain/i); // Adjust this depending on the content of the SupplyChain component
    expect(supplyChainHeading).toBeInTheDocument();
  });

  test('navigates to Predictions page when link is clicked', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Click the "Predictions" link
    const predictionsLink = screen.getByText(/predictions/i);
    fireEvent.click(predictionsLink);

    // Check if Predictions page is displayed
    const predictionsHeading = screen.getByText(/predictions/i); // Adjust this depending on the content of the Predictions component
    expect(predictionsHeading).toBeInTheDocument();
  });

  test('navigates to Data Input page when link is clicked', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Click the "Data Input" link
    const dataInputLink = screen.getByText(/data input/i);
    fireEvent.click(dataInputLink);

    // Check if Data Input page is displayed
    const dataInputHeading = screen.getByText(/data input/i); // Adjust this depending on the content of the DataInput component
    expect(dataInputHeading).toBeInTheDocument();
  });

  test('renders 404 page for invalid routes', () => {
    window.history.pushState({}, 'Test page', '/invalid-route');
    
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if 404 page content is displayed
    const notFoundText = screen.getByText(/Page Not Found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
