import { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import { motion } from 'motion/react';

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap'
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0
  }
};

const DecryptedText = memo(function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  ...props
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const [direction, setDirection] = useState('forward');

  const containerRef = useRef(null);
  const displayRef = useRef(null);
  const srRef = useRef(null);
  const orderRef = useRef([]);
  const pointerRef = useRef(0);
  const revealedRef = useRef(new Set());
  const intervalRef = useRef(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
      : characters.split('');
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText, currentRevealed) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    },
    [availableChars]
  );

  // Render text directly to DOM without React re-render
  const renderToDom = useCallback((displayText, revealed) => {
    const el = displayRef.current;
    if (!el) return;
    // Rebuild spans only when the set of revealed indices changes,
    // not on every shuffle tick. For non-sequential, just update textContent.
    if (sequential && revealed) {
      // For sequential, we need individual spans for styling
      el.innerHTML = '';
      for (let i = 0; i < displayText.length; i++) {
        const span = document.createElement('span');
        span.className = (revealed.has(i) || (!isAnimating && isDecrypted)) ? className : encryptedClassName;
        span.textContent = displayText[i];
        el.appendChild(span);
      }
    } else {
      // For non-sequential, just update text content in existing spans or create them once
      if (el.children.length !== displayText.length) {
        el.innerHTML = '';
        for (let i = 0; i < displayText.length; i++) {
          const span = document.createElement('span');
          span.className = encryptedClassName;
          span.textContent = displayText[i];
          el.appendChild(span);
        }
      } else {
        const spans = el.children;
        for (let i = 0; i < displayText.length; i++) {
          spans[i].textContent = displayText[i];
        }
      }
    }
    if (srRef.current) srRef.current.textContent = displayText;
  }, [className, encryptedClassName, isAnimating, isDecrypted, sequential]);

  // Render final decrypted state with proper spans
  const renderFinal = useCallback((displayText, decrypted) => {
    const el = displayRef.current;
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < displayText.length; i++) {
      const span = document.createElement('span');
      span.className = decrypted ? className : encryptedClassName;
      span.textContent = displayText[i];
      el.appendChild(span);
    }
    if (srRef.current) srRef.current.textContent = displayText;
  }, [className, encryptedClassName]);

  const computeOrder = useCallback(
    len => {
      const order = [];
      if (len <= 0) return order;
      if (revealDirection === 'start') {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === 'end') {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const removeRandomIndices = useCallback((set, count) => {
    const arr = Array.from(set);
    for (let i = 0; i < count && arr.length > 0; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      arr.splice(idx, 1);
    }
    return new Set(arr);
  }, []);

  const encryptInstantly = useCallback(() => {
    revealedRef.current = new Set();
    const shuffled = shuffleText(text, new Set());
    renderFinal(shuffled, false);
    setIsDecrypted(false);
  }, [text, shuffleText, renderFinal]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
      revealedRef.current = new Set();
    } else {
      revealedRef.current = new Set();
    }
    setDirection('forward');
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
      revealedRef.current = fillAllIndices();
      renderFinal(shuffleText(text, fillAllIndices()), true);
    } else {
      revealedRef.current = fillAllIndices();
      renderFinal(shuffleText(text, fillAllIndices()), true);
    }
    setDirection('reverse');
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text, renderFinal]);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;
    let rafId = null;
    let lastTime = performance.now();
    let cancelled = false;

    const getNextIndex = revealedSet => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const tick = (now) => {
      if (cancelled) return;

      const elapsed = now - lastTime;
      if (elapsed < speed) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastTime = now;

      const prevRevealed = revealedRef.current;

      if (sequential) {
        if (direction === 'forward') {
          if (prevRevealed.size < text.length) {
            const nextIndex = getNextIndex(prevRevealed);
            const newRevealed = new Set(prevRevealed);
            newRevealed.add(nextIndex);
            revealedRef.current = newRevealed;
            const shuffled = shuffleText(text, newRevealed);
            renderToDom(shuffled, newRevealed);
          } else {
            cancelled = true;
            setIsAnimating(false);
            setIsDecrypted(true);
            renderFinal(text, true);
          }
        } else if (direction === 'reverse') {
          if (pointerRef.current < orderRef.current.length) {
            const idxToRemove = orderRef.current[pointerRef.current++];
            const newRevealed = new Set(prevRevealed);
            newRevealed.delete(idxToRemove);
            revealedRef.current = newRevealed;
            const shuffled = shuffleText(text, newRevealed);
            renderToDom(shuffled, newRevealed);
            if (newRevealed.size === 0) {
              cancelled = true;
              setIsAnimating(false);
              setIsDecrypted(false);
            }
          } else {
            cancelled = true;
            setIsAnimating(false);
            setIsDecrypted(false);
          }
        }
      } else {
        if (direction === 'forward') {
          const shuffled = shuffleText(text, prevRevealed);
          renderToDom(shuffled, prevRevealed);
          currentIteration++;
          if (currentIteration >= maxIterations) {
            cancelled = true;
            setIsAnimating(false);
            setIsDecrypted(true);
            renderFinal(text, true);
          }
        } else if (direction === 'reverse') {
          let currentSet = prevRevealed;
          if (currentSet.size === 0) {
            currentSet = fillAllIndices();
          }
          const removeCount = Math.max(1, Math.ceil(text.length / Math.max(1, maxIterations)));
          const nextSet = removeRandomIndices(currentSet, removeCount);
          revealedRef.current = nextSet;
          const shuffled = shuffleText(text, nextSet);
          renderToDom(shuffled, nextSet);
          currentIteration++;
          if (nextSet.size === 0 || currentIteration >= maxIterations) {
            cancelled = true;
            setIsAnimating(false);
            setIsDecrypted(false);
            renderFinal(shuffleText(text, new Set()), false);
            revealedRef.current = new Set();
          }
        }
      }

      if (!cancelled) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [
    isAnimating, text, speed, maxIterations, sequential, revealDirection,
    shuffleText, direction, fillAllIndices, removeRandomIndices,
    renderToDom, renderFinal
  ]);

  const handleClick = () => {
    if (animateOn !== 'click') return;
    if (clickMode === 'once') {
      if (isDecrypted) return;
      setDirection('forward');
      triggerDecrypt();
    }
    if (clickMode === 'toggle') {
      if (isDecrypted) {
        triggerReverse();
      } else {
        setDirection('forward');
        triggerDecrypt();
      }
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    revealedRef.current = new Set();
    setIsDecrypted(false);
    setDirection('forward');
    setIsAnimating(true);
  }, [isAnimating]);

  const resetToPlainText = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsAnimating(false);
    revealedRef.current = new Set();
    setIsDecrypted(true);
    setDirection('forward');
    renderFinal(text, true);
  }, [text, renderFinal]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return;

    const observerCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt();
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null, rootMargin: '0px', threshold: 0.1
    });

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === 'click') {
      encryptInstantly();
    } else {
      revealedRef.current = new Set();
      setIsDecrypted(true);
      renderFinal(text, true);
    }
    setDirection('forward');
  }, [animateOn, text, encryptInstantly, renderFinal]);

  const animateProps =
    animateOn === 'hover' || animateOn === 'inViewHover'
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : animateOn === 'click'
        ? { onClick: handleClick }
        : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={{ ...styles.wrapper, willChange: 'contents' }} {...animateProps} {...props}>
      <span ref={srRef} style={styles.srOnly}>{text}</span>
      <span ref={displayRef} aria-hidden="true" />
    </motion.span>
  );
});

export default DecryptedText;
