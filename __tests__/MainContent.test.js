import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainContent from '../src/components/MainContent';
import { getTools, loadTool } from '../src/components/toolsRegistry/toolRegistry';

jest.mock('../src/components/toolsRegistry/toolRegistry', () => ({
  getTools: jest.fn(),
  loadTool: jest.fn(),
}));

describe('MainContent', () => {
  beforeEach(() => {
    getTools.mockReturnValue([
      { id: 'Tool1', name: 'Tool 1' },
      { id: 'Tool2', name: 'Tool 2' },
    ]);
    loadTool.mockImplementation((id) => {
      if (id === 'Tool1') return Promise.resolve(() => <div>Tool 1 Component</div>);
      if (id === 'Tool2') return Promise.resolve(() => <div>Tool 2 Component</div>);
    });
  });

  test('renders without crashing', () => {
    render(<MainContent />);
    expect(screen.getByText('Select a tool:')).toBeInTheDocument();
  });

  test('displays tool options', () => {
    render(<MainContent />);
    expect(screen.getByText('Tool1')).toBeInTheDocument();
    expect(screen.getByText('Tool2')).toBeInTheDocument();
  });

  test('changes selected tool when option is clicked', () => {
    render(<MainContent />);
    fireEvent.click(screen.getByText('Tool2'));
    expect(screen.getByText('Tool 2 Component')).toBeInTheDocument();
  });

  test('displays no tool selected message initially', () => {
    render(<MainContent />);
    expect(screen.getByText('No tool selected')).toBeInTheDocument();
  });
});