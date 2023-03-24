import { Container } from "../Container";
import { NavButtons } from "./NavButtons";

export function NavBar() {
  return (
    <Container>
      <nav className={" flex justify-end p-2"}>
        <div className={" "}>
          <NavButtons />
        </div>
      </nav>
    </Container>
  );
}
