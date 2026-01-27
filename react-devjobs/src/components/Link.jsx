import { useRouter } from "../hooks/useRouter.jsx";

export function Link({href, children, ...restOfProps}) {
    const { navigateTo } = useRouter();

    const handleClick = function(e) {
        e.preventDefault();

        navigateTo(href);
    }

  return (
    <a href={href} {...restOfProps} onClick={handleClick}>
      {children}
    </a>
  )
}