let
  pkgs = import <nixpkgs> { };
in
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_latest
    pkgs.pnpm
  ];

  shellHook = ''
    echo "Node.js version: $(node -v)"
    echo "pnpm version: $(pnpm -v)"
  '';
}
