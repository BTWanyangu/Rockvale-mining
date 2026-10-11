import { Component } from "react";
import type { ReactNode } from "react";
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    console.error("A website view could not be rendered.");
  }
  render() {
    return this.state.failed ? (
      <main className="not-found wrap">
        <h1>This page couldn’t be loaded.</h1>
        <p>Reload the website to try again.</p>
        <a className="btn dark" href="/">
          Reload the homepage
        </a>
      </main>
    ) : (
      this.props.children
    );
  }
}
