# Double Jump & Powerups - Design Doc

## Double Jump

- Player can perform **one extra jump** while airborne (max 2 jumps total)
- Counter resets when player touches the ground
- Second jump applies **70% of normal jump force** for balance
- Second jump spawns **yellow particles** instead of cyan to differentiate visually
- Jump counter tracked via `player.jumpsLeft` property (max: 2)

## Powerups

### Spawn Behavior
- Spawn randomly with **20% chance per obstacle spawn cycle**, replacing or supplementing an obstacle
- Powerups float at varying heights (30-70% of ground level)
- Each powerup bobs up/down with a sine wave animation
- Powerups despawn if they scroll off screen without being collected

### Types

| Type | Color | Duration | Effect |
|------|-------|----------|--------|
| Shield | `#0f0` (green) | 5s | Immune to obstacles, player glows green |
| Slow Motion | `#00f` (blue) | 4s | Game speed reduced to 50% |
| Score Multiplier | `#ff0` (yellow) | 4s | Score increments at 2x rate |
| Magnet | `#f0f` (purple) | 5s | Floating point orbs (+1 each) spawn and drift toward player |

### Collection
- Collision detection similar to obstacles (AABB with margin)
- On collect: play a pickup sound, create burst of particles in the powerup's color, show score popup

### Active Powerup Display
- HUD element showing active powerup icon (colored square) + remaining time bar
- Positioned below the score display

## Visual Changes

- **Shield active**: Player rectangle glows green with larger shadow, inner color shifts to green
- **Slow Motion active**: Subtle blue tint overlay, game speed multiplier applied
- **Score Multiplier active**: Score text pulses/scales, "+2" popups instead of "+1"
- **Magnet active**: Purple orbs drift toward player position each frame

## Files to Modify
- `game.js` - All game logic changes
- `index.html` - Add powerup HUD element
- `styles.css` - Style for powerup HUD element
