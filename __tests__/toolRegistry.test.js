import '@testing-library/jest-dom';
import { getTools, loadTool, registerTool, unregisterTool } from './src/components/toolsRegistry/toolRegistry';

describe('toolRegistry', () => {
  test('getTools returns all registered tools', () => {
    const tools = getTools();
    expect(tools.length).toBeGreaterThan(0);
    expect(tools[0]).toHaveProperty('id');
    expect(tools[0]).toHaveProperty('name');
  });

  test('loadTool loads a tool component', async () => {
    const tool = await loadTool('afom');
    expect(tool).toBeDefined();
  });

  test('registerTool adds a new tool', () => {
    const initialToolsCount = getTools().length;
    registerTool('newTool', 'New Tool', () => import('./mockTool'));
    const newToolsCount = getTools().length;
    expect(newToolsCount).toBe(initialToolsCount + 1);
  });

  test('unregisterTool removes a tool', () => {
    const initialToolsCount = getTools().length;
    unregisterTool('newTool');
    const newToolsCount = getTools().length;
    expect(newToolsCount).toBe(initialToolsCount - 1);
  });
});