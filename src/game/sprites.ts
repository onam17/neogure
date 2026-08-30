import { Enemy, GameItem, ItemType, Player, Spike, Ladder } from '../types';

/**
 * Pixel-Art Rendering Engine for 1980s Ponpoko (너구리)
 */

export function drawRaccoon(ctx: CanvasRenderingContext2D, player: Player) {
  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

  if (player.facing === 'left') {
    ctx.scale(-1, 1);
  }

  // Invincibility flashing
  if (player.invincibleTimer > 0 && Math.floor(player.invincibleTimer * 10) % 2 === 0) {
    ctx.globalAlpha = 0.5;
  }

  const w = player.width;
  const h = player.height;
  const halfW = w / 2;
  const halfH = h / 2;

  if (player.state === 'dead') {
    // Dead / Hurt Sprite (fainting with dizzy X eyes)
    ctx.fillStyle = '#8B4513'; // Fur
    ctx.fillRect(-halfW + 4, -halfH + 6, w - 8, h - 8);

    // Tanuki mask & face
    ctx.fillStyle = '#2C1D11';
    ctx.fillRect(-halfW + 6, -halfH + 10, w - 12, 10);

    // X Eyes
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    // Left X
    ctx.beginPath();
    ctx.moveTo(-halfW + 8, -halfH + 12);
    ctx.lineTo(-halfW + 14, -halfH + 18);
    ctx.moveTo(-halfW + 14, -halfH + 12);
    ctx.lineTo(-halfW + 8, -halfH + 18);
    // Right X
    ctx.moveTo(-halfW + 18, -halfH + 12);
    ctx.lineTo(-halfW + 24, -halfH + 18);
    ctx.moveTo(-halfW + 24, -halfH + 12);
    ctx.lineTo(-halfW + 18, -halfH + 18);
    ctx.stroke();

    // Belly
    ctx.fillStyle = '#F5DEB3';
    ctx.fillRect(-halfW + 8, -halfH + 20, w - 16, 8);

    // Tear drop
    ctx.fillStyle = '#00FFFF';
    ctx.beginPath();
    ctx.arc(halfW - 6, -halfH + 12, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    return;
  }

  if (player.state === 'climbing') {
    // Back-facing climbing pose
    const climbCycle = Math.floor(player.animTick / 6) % 2;

    // Body
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(-halfW + 5, -halfH + 4, w - 10, h - 8);

    // Ears
    ctx.fillStyle = '#5C2E0B';
    ctx.fillRect(-halfW + 5, -halfH, 5, 6);
    ctx.fillRect(halfW - 10, -halfH, 5, 6);

    // Headband (Blue/White retro band)
    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(-halfW + 4, -halfH + 6, w - 8, 4);

    // Climbing hands
    ctx.fillStyle = '#2C1D11';
    if (climbCycle === 0) {
      ctx.fillRect(-halfW + 2, -halfH + 8, 5, 6);
      ctx.fillRect(halfW - 7, -halfH + 16, 5, 6);
      // Feet
      ctx.fillRect(-halfW + 6, halfH - 6, 6, 6);
      ctx.fillRect(halfW - 12, halfH - 10, 6, 6);
    } else {
      ctx.fillRect(-halfW + 2, -halfH + 16, 5, 6);
      ctx.fillRect(halfW - 7, -halfH + 8, 5, 6);
      // Feet
      ctx.fillRect(-halfW + 6, halfH - 10, 6, 6);
      ctx.fillRect(halfW - 12, halfH - 6, 6, 6);
    }

    // Striped Tail (swinging behind)
    ctx.fillStyle = '#D97706';
    ctx.fillRect(-4, halfH - 8, 8, 12);
    ctx.fillStyle = '#451A03';
    ctx.fillRect(-4, halfH - 4, 8, 4);

    ctx.restore();
    return;
  }

  // Normal Walking / Jumping / Idle Side-facing Raccoon
  const isJumping = player.state === 'jumping' || player.state === 'falling';
  const walkFrame = Math.floor(player.animTick / 6) % 4;

  // 1. Tail (Animated back and forth)
  const tailOffset = isJumping ? -6 : (walkFrame % 2 === 0 ? 0 : 3);
  ctx.fillStyle = '#D97706'; // Fur base
  ctx.beginPath();
  ctx.ellipse(-halfW + 2, halfH - 10 + tailOffset, 7, 10, -0.4, 0, Math.PI * 2);
  ctx.fill();
  // Tail stripes
  ctx.fillStyle = '#451A03';
  ctx.fillRect(-halfW - 2, halfH - 14 + tailOffset, 6, 4);
  ctx.fillRect(-halfW - 3, halfH - 8 + tailOffset, 7, 4);

  // 2. Body (Chubby tanuki silhouette)
  ctx.fillStyle = '#92400E';
  ctx.beginPath();
  ctx.roundRect(-halfW + 6, -halfH + 8, w - 12, h - 12, 6);
  ctx.fill();

  // 3. Belly (Cream tanuki tummy)
  ctx.fillStyle = '#FEF08A';
  ctx.beginPath();
  ctx.ellipse(0, 4, 8, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. Head & Ears
  ctx.fillStyle = '#78350F';
  // Left Ear
  ctx.beginPath();
  ctx.moveTo(-halfW + 6, -halfH + 6);
  ctx.lineTo(-halfW + 9, -halfH - 2);
  ctx.lineTo(-halfW + 13, -halfH + 4);
  ctx.fill();
  // Right Ear
  ctx.beginPath();
  ctx.moveTo(halfW - 14, -halfH + 4);
  ctx.lineTo(halfW - 10, -halfH - 2);
  ctx.lineTo(halfW - 7, -halfH + 6);
  ctx.fill();
  // Inner ears pink
  ctx.fillStyle = '#F472B6';
  ctx.fillRect(-halfW + 8, -halfH + 1, 3, 4);
  ctx.fillRect(halfW - 11, -halfH + 1, 3, 4);

  // 5. Traditional Blue/White Headband (Iconic 1980s Neoguri style)
  ctx.fillStyle = '#2563EB';
  ctx.fillRect(-halfW + 6, -halfH + 3, w - 10, 4);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(-halfW + 10, -halfH + 3, 4, 4);
  // Headband tie fluttering
  ctx.fillStyle = '#2563EB';
  ctx.fillRect(-halfW + 2, -halfH + 4, 5, 3);

  // 6. Tanuki Eye Mask (Black patch)
  ctx.fillStyle = '#1C1917';
  ctx.beginPath();
  ctx.ellipse(4, -halfH + 10, 8, 5, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // 7. Eye (Big shiny cartoon eye)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(5, -halfH + 9, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(6, -halfH + 9, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(6.5, -halfH + 8, 0.9, 0, Math.PI * 2);
  ctx.fill();

  // 8. Snout & Nose
  ctx.fillStyle = '#FDE68A';
  ctx.beginPath();
  ctx.ellipse(halfW - 4, -halfH + 12, 4, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(halfW - 2, -halfH + 11, 2, 0, Math.PI * 2);
  ctx.fill();

  // 9. Arms / Paws
  ctx.fillStyle = '#78350F';
  if (isJumping) {
    // Arms up in air
    ctx.fillRect(halfW - 6, -halfH + 4, 6, 8);
  } else {
    // Normal / walking paw swing
    const pawX = walkFrame % 2 === 0 ? halfW - 8 : halfW - 5;
    ctx.fillRect(pawX, 0, 6, 6);
  }

  // 10. Legs / Feet
  ctx.fillStyle = '#451A03';
  if (isJumping) {
    ctx.fillRect(-halfW + 8, halfH - 6, 6, 5);
    ctx.fillRect(halfW - 14, halfH - 8, 6, 5);
  } else if (player.state === 'walking') {
    if (walkFrame === 0 || walkFrame === 2) {
      ctx.fillRect(-halfW + 6, halfH - 4, 7, 5);
      ctx.fillRect(halfW - 12, halfH - 4, 7, 5);
    } else if (walkFrame === 1) {
      ctx.fillRect(-halfW + 8, halfH - 6, 7, 5);
      ctx.fillRect(halfW - 10, halfH - 3, 7, 5);
    } else {
      ctx.fillRect(-halfW + 4, halfH - 3, 7, 5);
      ctx.fillRect(halfW - 14, halfH - 6, 7, 5);
    }
  } else {
    // Idle feet
    ctx.fillRect(-halfW + 7, halfH - 4, 7, 5);
    ctx.fillRect(halfW - 13, halfH - 4, 7, 5);
  }

  ctx.restore();
}

/**
 * Draw Enemies (Caterpillar, Snake, Bat, Ghost)
 */
export function drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
  ctx.save();
  ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);

  if (enemy.facing === 'left') {
    ctx.scale(-1, 1);
  }

  const w = enemy.width;
  const h = enemy.height;
  const halfW = w / 2;
  const halfH = h / 2;

  if (enemy.type === 'caterpillar') {
    // Caterpillar (Green squirming caterpillar with yellow segments)
    const crawlTick = Math.sin(enemy.animTick * 0.2);
    const archY = crawlTick * 3;

    // Body Segments
    const segments = 4;
    for (let i = 0; i < segments; i++) {
      const segX = -halfW + 5 + i * 6;
      const segY = i === 1 || i === 2 ? -halfH + 8 - archY : -halfH + 8;
      
      // Outer segment
      ctx.fillStyle = i % 2 === 0 ? '#84CC16' : '#EAB308';
      ctx.beginPath();
      ctx.arc(segX, segY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Mini legs
      ctx.fillStyle = '#3F6212';
      ctx.fillRect(segX - 1, halfH - 3, 2, 3);
    }

    // Head
    const headX = halfW - 5;
    const headY = -halfH + 7;
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(headX, headY, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Antennae
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(headX, headY - 4);
    ctx.lineTo(headX + 3, headY - 8);
    ctx.moveTo(headX - 2, headY - 4);
    ctx.lineTo(headX - 3, headY - 8);
    ctx.stroke();

    // Big eye
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(headX + 2, headY - 1, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(headX + 3, headY - 1, 1, 0, Math.PI * 2);
    ctx.fill();
  } else if (enemy.type === 'snake') {
    // Snake (Red/yellow wavy viper)
    const wave = Math.sin(enemy.animTick * 0.3) * 3;

    // Snake Body Coils
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.ellipse(-halfW + 6, halfH - 6 + wave, 6, 4, 0, 0, Math.PI * 2);
    ctx.ellipse(-halfW + 14, halfH - 6 - wave, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Yellow stripe
    ctx.fillStyle = '#FBBF24';
    ctx.fillRect(-halfW + 5, halfH - 7 + wave, 3, 3);
    ctx.fillRect(-halfW + 13, halfH - 7 - wave, 3, 3);

    // Snake Head
    const headX = halfW - 6;
    const headY = halfH - 8;
    ctx.fillStyle = '#991B1B';
    ctx.beginPath();
    ctx.ellipse(headX, headY, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Snake Eye
    ctx.fillStyle = '#FDE047';
    ctx.beginPath();
    ctx.arc(headX + 2, headY - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(headX + 3, headY - 2, 1, 0, Math.PI * 2);
    ctx.fill();

    // Forked Tongue flicking
    if (Math.floor(enemy.animTick / 4) % 2 === 0) {
      ctx.strokeStyle = '#FF0055';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(headX + 6, headY);
      ctx.lineTo(headX + 11, headY - 1);
      ctx.lineTo(headX + 13, headY - 3);
      ctx.moveTo(headX + 11, headY - 1);
      ctx.lineTo(headX + 13, headY + 1);
      ctx.stroke();
    }
  } else if (enemy.type === 'bat') {
    // Bat (Flapping purple wings)
    const flap = Math.sin(enemy.animTick * 0.3) > 0 ? 1 : -1;
    
    // Body
    ctx.fillStyle = '#312E81';
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Red Eyes
    ctx.fillStyle = '#EF4444';
    ctx.fillRect(1, -2, 2, 2);
    ctx.fillRect(-3, -2, 2, 2);

    // Wings
    ctx.fillStyle = '#4C1D95';
    ctx.beginPath();
    if (flap === 1) {
      // Wings up
      ctx.moveTo(-2, 0);
      ctx.lineTo(-halfW, -halfH + 2);
      ctx.lineTo(-halfW + 4, 2);
      ctx.lineTo(0, 2);
      ctx.moveTo(2, 0);
      ctx.lineTo(halfW, -halfH + 2);
      ctx.lineTo(halfW - 4, 2);
      ctx.lineTo(0, 2);
    } else {
      // Wings down
      ctx.moveTo(-2, 0);
      ctx.lineTo(-halfW, halfH - 2);
      ctx.lineTo(-halfW + 4, 0);
      ctx.lineTo(0, 0);
      ctx.moveTo(2, 0);
      ctx.lineTo(halfW, halfH - 2);
      ctx.lineTo(halfW - 4, 0);
      ctx.lineTo(0, 0);
    }
    ctx.fill();
  } else if (enemy.type === 'ghost') {
    // Grim Reaper / Time-out Ghost
    const hover = Math.sin(enemy.animTick * 0.2) * 3;
    
    ctx.fillStyle = '#6366F1';
    ctx.beginPath();
    ctx.arc(0, -4 + hover, 8, Math.PI, 0, false);
    ctx.lineTo(8, 8 + hover);
    ctx.lineTo(4, 5 + hover);
    ctx.lineTo(0, 8 + hover);
    ctx.lineTo(-4, 5 + hover);
    ctx.lineTo(-8, 8 + hover);
    ctx.closePath();
    ctx.fill();

    // Glowing Eyes
    ctx.fillStyle = '#F43F5E';
    ctx.beginPath();
    ctx.arc(-3, -4 + hover, 2, 0, Math.PI * 2);
    ctx.arc(3, -4 + hover, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draw Stage Item (Carrot, Apple, Banana, Watermelon, etc.)
 */
export function drawItem(ctx: CanvasRenderingContext2D, item: GameItem) {
  if (item.collected) return;

  ctx.save();
  ctx.translate(item.x + item.width / 2, item.y + item.height / 2);

  // Subtle floating bounce animation
  const bounce = Math.sin((item.animationTick || 0) * 0.1) * 2;
  ctx.translate(0, bounce);

  const w = item.width;
  const h = item.height;
  const halfW = w / 2;
  const halfH = h / 2;

  switch (item.type) {
    case 'carrot':
      // Carrot (Bright Orange + Green Leaves)
      ctx.fillStyle = '#EA580C';
      ctx.beginPath();
      ctx.moveTo(-halfW + 4, -halfH + 6);
      ctx.lineTo(halfW - 4, -halfH + 6);
      ctx.lineTo(0, halfH);
      ctx.closePath();
      ctx.fill();
      // Ridges
      ctx.strokeStyle = '#C2410C';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-3, -2);
      ctx.lineTo(2, -2);
      ctx.moveTo(-2, 2);
      ctx.lineTo(1, 2);
      ctx.stroke();
      // Green Leaf
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(-2, -halfH, 4, 7);
      ctx.fillRect(-4, -halfH + 2, 2, 3);
      ctx.fillRect(2, -halfH + 2, 2, 3);
      break;

    case 'apple':
      // Red Apple
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.arc(0, 2, halfW - 2, 0, Math.PI * 2);
      ctx.fill();
      // Stem & Leaf
      ctx.fillStyle = '#78350F';
      ctx.fillRect(-1, -halfH, 2, 4);
      ctx.fillStyle = '#16A34A';
      ctx.fillRect(1, -halfH + 1, 3, 2);
      // Shine
      ctx.fillStyle = '#F87171';
      ctx.fillRect(-3, -1, 2, 3);
      break;

    case 'banana':
      // Banana Bunch
      ctx.fillStyle = '#FACC15';
      ctx.beginPath();
      ctx.arc(0, 0, halfW - 2, 0.2, Math.PI * 0.85);
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#FACC15';
      ctx.stroke();
      // Tips
      ctx.fillStyle = '#65A30D';
      ctx.fillRect(-halfW + 2, -2, 3, 3);
      ctx.fillStyle = '#78350F';
      ctx.fillRect(halfW - 4, -2, 2, 2);
      break;

    case 'watermelon':
      // Watermelon Wedge
      ctx.fillStyle = '#15803D'; // Rind
      ctx.beginPath();
      ctx.arc(0, 0, halfW, 0, Math.PI);
      ctx.fill();
      // Red Flesh
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(0, 0, halfW - 3, 0, Math.PI);
      ctx.fill();
      // Seeds
      ctx.fillStyle = '#000000';
      ctx.fillRect(-3, 3, 2, 2);
      ctx.fillRect(3, 3, 2, 2);
      ctx.fillRect(0, 6, 2, 2);
      break;

    case 'strawberry':
      // Strawberry
      ctx.fillStyle = '#E11D48';
      ctx.beginPath();
      ctx.moveTo(-halfW + 3, -halfH + 6);
      ctx.lineTo(halfW - 3, -halfH + 6);
      ctx.lineTo(0, halfH);
      ctx.closePath();
      ctx.fill();
      // Seeds
      ctx.fillStyle = '#FEF08A';
      ctx.fillRect(-2, -1, 1.5, 1.5);
      ctx.fillRect(2, -1, 1.5, 1.5);
      ctx.fillRect(0, 3, 1.5, 1.5);
      // Leaves
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(-4, -halfH + 3, 8, 3);
      break;

    case 'radish':
      // White Radish
      ctx.fillStyle = '#F1F5F9';
      ctx.beginPath();
      ctx.moveTo(-halfW + 4, -halfH + 6);
      ctx.lineTo(halfW - 4, -halfH + 6);
      ctx.lineTo(0, halfH);
      ctx.closePath();
      ctx.fill();
      // Leaves
      ctx.fillStyle = '#16A34A';
      ctx.fillRect(-2, -halfH, 4, 7);
      break;

    case 'mushroom':
      // Mushroom
      ctx.fillStyle = '#EF4444'; // Cap
      ctx.beginPath();
      ctx.arc(0, -2, halfW - 2, Math.PI, 0);
      ctx.fill();
      // Dots
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-3, -5, 2, 2);
      ctx.fillRect(3, -5, 2, 2);
      // Stem
      ctx.fillStyle = '#F5F5F4';
      ctx.fillRect(-3, -2, 6, halfH + 2);
      break;

    case 'grape':
      // Grape Bunch
      ctx.fillStyle = '#9333EA';
      ctx.beginPath();
      ctx.arc(-3, -2, 3.5, 0, Math.PI * 2);
      ctx.arc(3, -2, 3.5, 0, Math.PI * 2);
      ctx.arc(0, 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Stem
      ctx.fillStyle = '#15803D';
      ctx.fillRect(-1, -halfH, 2, 4);
      break;

    case 'pot':
      // Mystery Earthenware Jar (항아리)
      if (item.potOpened) {
        // Broken pot
        ctx.fillStyle = '#B45309';
        ctx.fillRect(-halfW + 2, halfH - 6, w - 4, 6);
        ctx.fillStyle = '#78350F';
        ctx.fillRect(-halfW + 4, halfH - 10, 4, 4);
        ctx.fillRect(halfW - 8, halfH - 10, 4, 4);
      } else {
        // Closed Jar with decorative ring & lid
        ctx.fillStyle = '#9A3412';
        ctx.beginPath();
        ctx.roundRect(-halfW + 2, -halfH + 4, w - 4, h - 5, 4);
        ctx.fill();

        // Rim & Lid
        ctx.fillStyle = '#C2410C';
        ctx.fillRect(-halfW + 1, -halfH + 2, w - 2, 4);
        ctx.fillStyle = '#7C2D12';
        ctx.fillRect(-halfW + 4, -halfH + 7, w - 8, 2);

        // Golden Question Mark or Mark
        ctx.fillStyle = '#FDE047';
        ctx.font = 'bold 9px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', 0, 3);
      }
      break;

    case 'diamond':
      // Sparkling Blue Diamond
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.moveTo(0, -halfH);
      ctx.lineTo(halfW, 0);
      ctx.lineTo(0, halfH);
      ctx.lineTo(-halfW, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#BAE6FD';
      ctx.fillRect(-2, -2, 4, 4);
      break;

    case 'coin':
      // Golden Coin
      ctx.fillStyle = '#EAB308';
      ctx.beginPath();
      ctx.arc(0, 0, halfW - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(0, 0, halfW - 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#CA8A04';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', 0, 1);
      break;

    case 'life':
      // 1UP Extra Heart/Raccoon icon
      ctx.fillStyle = '#EC4899';
      ctx.beginPath();
      ctx.arc(-3, -2, 3.5, Math.PI, 0);
      ctx.arc(3, -2, 3.5, Math.PI, 0);
      ctx.lineTo(0, halfH);
      ctx.closePath();
      ctx.fill();
      break;
  }

  ctx.restore();
}

/**
 * Draw Spikes / Tacks (압정/가시)
 */
export function drawSpikes(ctx: CanvasRenderingContext2D, spike: Spike) {
  ctx.save();
  ctx.translate(spike.x, spike.y);

  // Sharp Metal Spikes
  const spikeCount = 3;
  const spkW = spike.width / spikeCount;

  for (let i = 0; i < spikeCount; i++) {
    const sx = i * spkW;
    // Silver sharp triangle
    ctx.fillStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.moveTo(sx, spike.height);
    ctx.lineTo(sx + spkW / 2, 0);
    ctx.lineTo(sx + spkW, spike.height);
    ctx.closePath();
    ctx.fill();

    // Red warning tip
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.moveTo(sx + spkW * 0.25, spike.height * 0.4);
    ctx.lineTo(sx + spkW / 2, 0);
    ctx.lineTo(sx + spkW * 0.75, spike.height * 0.4);
    ctx.closePath();
    ctx.fill();
  }

  // Base plate
  ctx.fillStyle = '#64748B';
  ctx.fillRect(0, spike.height - 3, spike.width, 3);

  ctx.restore();
}

/**
 * Draw Ladder
 */
export function drawLadder(ctx: CanvasRenderingContext2D, ladder: Ladder) {
  ctx.save();
  const h = ladder.bottomY - ladder.topY;
  const w = ladder.width;

  // Ladder Side Rails (Sturdy retro wood / iron)
  ctx.fillStyle = '#0284C7'; // Classic Ponpoko blue/cyan ladder rails
  ctx.fillRect(ladder.x, ladder.topY, 4, h);
  ctx.fillRect(ladder.x + w - 4, ladder.topY, 4, h);

  // Highlights
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(ladder.x + 1, ladder.topY, 2, h);
  ctx.fillRect(ladder.x + w - 3, ladder.topY, 2, h);

  // Rungs
  const rungSpacing = 12;
  const rungs = Math.floor(h / rungSpacing);

  for (let i = 0; i <= rungs; i++) {
    const ry = ladder.topY + i * rungSpacing;
    if (ry <= ladder.bottomY) {
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(ladder.x + 3, ry, w - 6, 3);
      ctx.fillStyle = '#BAE6FD';
      ctx.fillRect(ladder.x + 3, ry, w - 6, 1);
    }
  }

  ctx.restore();
}

/**
 * Draw Floor / Platform Tiles
 */
export function drawPlatform(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  themeColor: string = '#15803D'
) {
  ctx.save();
  
  // Platform Top Grass / Surface Line
  ctx.fillStyle = themeColor;
  ctx.fillRect(x, y, w, h);

  // Brick / Block Patterns
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  const brickW = 16;
  const count = Math.ceil(w / brickW);

  for (let i = 0; i < count; i++) {
    const bx = x + i * brickW;
    ctx.fillRect(bx, y, 1, h);
    ctx.fillRect(bx, y + h / 2, brickW, 1);
  }

  // Top highlight line
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fillRect(x, y, w, 2);

  // Bottom shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(x, y + h - 2, w, 2);

  ctx.restore();
}
