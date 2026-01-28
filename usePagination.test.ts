import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination Hook', () => {
  const mockData = Array.from({ length: 10 }, (_, i) => i + 1); // [1, ..., 10]
  const itemsPerPage = 3;

  test('initializes correctly', () => {
    const { result } = renderHook(() => usePagination(mockData, itemsPerPage));
    
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(4); // 10 items / 3 per page = 3.33 -> 4 pages
    expect(result.current.currentData).toEqual([1, 2, 3]);
  });

  test('navigates to next page', () => {
    const { result } = renderHook(() => usePagination(mockData, itemsPerPage));
    
    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentData).toEqual([4, 5, 6]);
  });

  test('navigates to previous page', () => {
    const { result } = renderHook(() => usePagination(mockData, itemsPerPage));
    
    act(() => {
      result.current.nextPage(); // Go to 2
      result.current.prevPage(); // Back to 1
    });

    expect(result.current.currentPage).toBe(1);
  });

  test('does not exceed bounds', () => {
    const { result } = renderHook(() => usePagination(mockData, itemsPerPage));
    
    // Try to go back from page 1
    act(() => result.current.prevPage());
    expect(result.current.currentPage).toBe(1);
  });

  test('resets to page 1 when data changes', () => {
    const { result, rerender } = renderHook(({ data }) => usePagination(data, itemsPerPage), {
      initialProps: { data: mockData }
    });

    // Move to page 2
    act(() => result.current.nextPage());
    expect(result.current.currentPage).toBe(2);

    // Change data
    const newData = [1, 2, 3, 4, 5];
    rerender({ data: newData });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(2);
  });
});