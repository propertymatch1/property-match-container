import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SplitScreenLayout } from "./split-screen-layout";

describe("SplitScreenLayout - Responsive Behavior", () => {
  it("renders both left and right content sections", () => {
    render(
      <SplitScreenLayout
        leftContent={<div data-testid="left-content">Left</div>}
        rightContent={<div data-testid="right-content">Right</div>}
      />,
    );

    expect(screen.getByTestId("left-content")).toBeInTheDocument();
    expect(screen.getByTestId("right-content")).toBeInTheDocument();
  });

  it("applies mobile stacking classes (flex-col)", () => {
    const { container } = render(
      <SplitScreenLayout
        leftContent={<div>Left</div>}
        rightContent={<div>Right</div>}
      />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("flex-col");
    expect(wrapper).toHaveClass("md:flex-row");
  });

  it("applies correct width ratios via flex-basis", () => {
    render(
      <SplitScreenLayout
        leftContent={<div>Left</div>}
        rightContent={<div>Right</div>}
        leftRatio={40}
        rightRatio={60}
      />,
    );

    const sections = screen.getAllByRole("region");
    expect(sections[0]).toHaveStyle({ flexBasis: "40%" });
    expect(sections[1]).toHaveStyle({ flexBasis: "60%" });
  });

  it("applies left-first mobile stack order by default", () => {
    render(
      <SplitScreenLayout
        leftContent={<div>Left</div>}
        rightContent={<div>Right</div>}
      />,
    );

    const sections = screen.getAllByRole("region");
    expect(sections[0]).toHaveClass("order-1");
    expect(sections[1]).toHaveClass("order-2");
  });

  it("applies right-first mobile stack order when specified", () => {
    render(
      <SplitScreenLayout
        leftContent={<div>Left</div>}
        rightContent={<div>Right</div>}
        mobileStackOrder="right-first"
      />,
    );

    const sections = screen.getAllByRole("region");
    expect(sections[0]).toHaveClass("order-2");
    expect(sections[1]).toHaveClass("order-1");
  });

  it("applies responsive padding using design tokens", () => {
    render(
      <SplitScreenLayout
        leftContent={<div>Left</div>}
        rightContent={<div>Right</div>}
      />,
    );

    const sections = screen.getAllByRole("region");
    sections.forEach((section) => {
      expect(section).toHaveClass("p-[var(--spacing-6)]");
      expect(section).toHaveClass("md:p-[var(--spacing-8)]");
      expect(section).toHaveClass("lg:p-[var(--spacing-12)]");
    });
  });

  it("maintains desktop order regardless of mobile stack order", () => {
    render(
      <SplitScreenLayout
        leftContent={<div>Left</div>}
        rightContent={<div>Right</div>}
        mobileStackOrder="right-first"
      />,
    );

    const sections = screen.getAllByRole("region");
    expect(sections[0]).toHaveClass("md:order-1");
    expect(sections[1]).toHaveClass("md:order-2");
  });
});
