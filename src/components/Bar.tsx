import React from 'react';
import styled from 'styled-components';

// Styled component for the bar
const BarContainer = styled.div<{ height: string; backgroundColor: string }>`
  height: ${(props) => props.height}; // Set height based on prop
  width: 100%; // Use 100% instead of 100vw for better compatibility
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 1rem; // Add padding for better spacing on small screens
  box-sizing: border-box; // Include padding in the element's total width and height
`;

// Styled component for the text
const WallStatement = styled.p<{ isQuote: boolean; fontFamily: string; fontSize: string }>`
  font-family: ${(props) => props.fontFamily}; // Set font-family based on prop
  font-size: ${(props) => props.fontSize}; // Set font-size based on prop
  color: #333;
  text-align: center;
  max-width: 100%; // Allow text to use full width on small screens
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0; // Remove default margin
  font-style: ${(props) => (props.isQuote ? 'italic' : 'normal')}; // Italicize if it's a quote
  border-left: ${(props) => (props.isQuote ? '4px solid #ccc' : 'none')}; // Add left border if it's a quote
  padding-left: ${(props) => (props.isQuote ? '1rem' : '0')}; // Add padding if it's a quote
`;

// Styled component for the additional element
const AdditionalElementContainer = styled.div`
  margin-left: 10px;
  @media (max-width: 768px) {
    margin-left: 5px; // Reduce margin on smaller screens
  }
`;

/**
 * Bar component that displays a customizable statement on the wall
 * 
 * This component creates a responsive bar that spans the entire width of its container
 * and has customizable height and background color. It contains a styled text
 * that looks like a statement written on the wall. Additionally, it can display
 * an extra element to the right of the text.
 * 
 * @param {string} text - The text to display in the bar
 * @param {string} height - The height of the bar (e.g., '50px', '10%', etc.)
 * @param {string} backgroundColor - The background color of the bar
 * @param {boolean} [boldText=false] - Whether to display the text in bold
 * @param {string} [textColor='#333'] - The color of the text
 * @param {boolean} [isQuote=false] - Whether to stylize the text as a quote
 * @param {string} [fontFamily='Georgia, serif'] - The font family of the text
 * @param {string} [fontSize='1rem'] - The font size of the text
 * @param {React.ReactNode} [additionalElement] - An optional element to display next to the text
 * @returns {JSX.Element} The rendered Bar component
 */
const Bar: React.FC<{
  text: string;
  height: string;
  backgroundColor: string;
  boldText?: boolean;
  textColor?: string;
  isQuote?: boolean;
  fontFamily?: string;
  fontSize?: string;
  additionalElement?: React.ReactNode;
}> = ({ text, height, backgroundColor, boldText = false, textColor = '#333', isQuote = false, fontFamily = 'Georgia, serif', fontSize = '1rem', additionalElement }) => {
  return (
    <BarContainer height={height} backgroundColor={backgroundColor}>
      <WallStatement isQuote={isQuote} fontFamily={fontFamily} fontSize={fontSize} style={{ fontWeight: boldText ? 'bold' : 'normal', color: textColor }}>
        {text}
      </WallStatement>
      {additionalElement && (
        <AdditionalElementContainer>
          {additionalElement}
        </AdditionalElementContainer>
      )}
    </BarContainer>
  );
};

export default Bar;
