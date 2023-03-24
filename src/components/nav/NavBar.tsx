import { Container } from "../Container";
import { LoginButton } from "./LoginButton";
import { NavButtons } from "./NavButtons";

export function NavBar() {
  return (
    <Container>
      <nav className={" p-2"}>
        <div className={" flex justify-end"}>
          <NavButtons />
        </div>
      </nav>
    </Container>
  );
}
