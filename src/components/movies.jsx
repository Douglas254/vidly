import React, { Component } from "react";
import Like from "./common/like";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0)
      return (
        <p>
          <b style={{ color: "purple", fontFamily: "serif", fontSize: 30 }}>
            There are no movies in the database
          </b>
        </p>
      );

    return (
      <React.Fragment>
        <div className="table-responsive">
          <p>
            <b>There are {count} movies in the Database</b>
          </p>
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <td>
                  <b>Title</b>
                </td>
                <td>
                  <b>Genre</b>
                </td>
                <td>
                  <b>Stock</b>
                </td>
                <td>
                  <b>Rate</b>
                </td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
