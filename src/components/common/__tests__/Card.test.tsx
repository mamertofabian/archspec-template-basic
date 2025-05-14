import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

describe('Card Component', () => {
  it('renders correctly with default props', () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();

    // Check that content is inside the correct div
    const contentContainer = content.closest('div');
    expect(contentContainer).toHaveClass('p-6 pt-0');

    // Check outer container has the right classes
    const cardContainer = contentContainer?.parentElement;
    expect(cardContainer).toHaveClass('rounded-xl border bg-card text-card-foreground shadow');
  });

  it('renders with a title when provided', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    );
    const title = screen.getByText('Test Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('font-semibold leading-none tracking-tight');
    expect(title.parentElement).toHaveClass('flex flex-col space-y-1.5 p-6');
  });

  it('applies custom className when provided', () => {
    render(
      <Card className="custom-class">
        <CardContent>Content</CardContent>
      </Card>
    );
    const card = screen.getByText('Content').closest('div.rounded-xl');
    expect(card).toHaveClass('custom-class');
  });

  it('renders with a footer when provided', () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
        <CardFooter>
          <button>Footer Button</button>
        </CardFooter>
      </Card>
    );
    const footerButton = screen.getByText('Footer Button');
    expect(footerButton).toBeInTheDocument();
    expect(footerButton.parentElement).toHaveClass('flex items-center p-6 pt-0');
  });

  it('renders with both title and footer when provided', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>Main Content</CardContent>
        <CardFooter>
          <span>Footer Content</span>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});
