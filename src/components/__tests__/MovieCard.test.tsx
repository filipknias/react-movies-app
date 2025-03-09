import { render, screen } from "@/utilities/testUtils";
import { test, describe } from 'vitest';
import MovieCard from "@/components/movies/MovieCard";

describe("MovieCard", () => {
  test("renders component", () => {
    const props = { 
      id: 1, 
      posterPath: 'test.png',
      title: 'Test title',
      votesAverage: 8,
      overview: 'Test overview',
    };
    
    render(<MovieCard {...props} />);
  });

  test("should display title", () => {
    const props = { 
      id: 1, 
      posterPath: 'test.png',
      title: 'Test title',
      votesAverage: 8,
      overview: 'Test overview',
    };
    
    render(<MovieCard {...props} />);

    const titleHeading = screen.getByText(props.title);
    expect(titleHeading).toBeInTheDocument();
  });

  test("image should have correct src", () => {
    const props = { 
      id: 1, 
      posterPath: 'test.png',
      title: 'Test title',
      votesAverage: 8,
      overview: 'Test overview',
    };
    
    render(<MovieCard {...props} />);
 
    const image = screen.getByAltText(props.title);
    expect(image).toHaveAttribute('src', `https://image.tmdb.org/t/p/w200/${props.posterPath}`);
  });
});
