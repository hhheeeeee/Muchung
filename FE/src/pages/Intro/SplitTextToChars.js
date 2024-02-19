// IntroUpper 글씨 애니메이션을 추가하기 위한 파일
//Blogpost and origin
//https://webanimation.blog/blog/wavy-text-animation-using-react-hooks-with-gsap-v3/
function SplitTextToChars(textNode) {
  const textContent = textNode.textContent;
  const textSplit = textContent.split("");

  const frag = document.createDocumentFragment();
  textSplit.forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style = `${letter === " " ? "min-width: 1rem;" : ""}z-index: ${
      textSplit.length - i
    }; position: relative; display: inline-block;`;
    frag.appendChild(span);
  });
  textNode.textContent = "";
  textNode.appendChild(frag);

  return textNode.children;
}

export default SplitTextToChars;
