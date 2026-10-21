import { Text } from '@react-three/drei'
import type { PokemonRole } from '../pokemon/pieces'
import { metaForFenPiece } from '../pokemon/pieces'

type Props = {
  fenChar: string
  selected?: boolean
}

function RoleShape({ role, accent, body }: { role: PokemonRole; accent: string; body: string }) {
  switch (role) {
    case 'pawn':
      return (
        <group>
          <mesh position={[0, 0.35, 0]} castShadow>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color={body} roughness={0.45} metalness={0.1} />
          </mesh>
          <mesh position={[-0.12, 0.52, 0]} rotation={[0, 0, -0.4]} castShadow>
            <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
            <meshStandardMaterial color={accent} />
          </mesh>
          <mesh position={[0.12, 0.52, 0]} rotation={[0, 0, 0.4]} castShadow>
            <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
            <meshStandardMaterial color={accent} />
          </mesh>
        </group>
      )
    case 'rook':
      return (
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[0.55, 0.75, 0.55]} />
          <meshStandardMaterial color={body} roughness={0.55} />
        </mesh>
      )
    case 'knight':
      return (
        <group rotation={[0, Math.PI / 4, 0]}>
          <mesh position={[0, 0.35, 0.08]} castShadow>
            <coneGeometry args={[0.28, 0.65, 5]} />
            <meshStandardMaterial color={body} emissive={accent} emissiveIntensity={0.15} />
          </mesh>
          <mesh position={[0, 0.62, 0.22]} castShadow>
            <coneGeometry args={[0.08, 0.35, 4]} />
            <meshStandardMaterial color={accent} />
          </mesh>
        </group>
      )
    case 'bishop':
      return (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.28, 0.75, 16]} />
            <meshStandardMaterial color={body} />
          </mesh>
          <mesh position={[0, 0.82, 0]} castShadow>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color={accent} metalness={0.35} roughness={0.25} />
          </mesh>
        </group>
      )
    case 'queen':
      return (
        <group>
          <mesh position={[0, 0.4, 0]} castShadow>
            <capsuleGeometry args={[0.22, 0.45, 8, 16]} />
            <meshStandardMaterial color={body} />
          </mesh>
          <mesh position={[0, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.28, 0.04, 8, 32]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.35} />
          </mesh>
        </group>
      )
    case 'king':
      return (
        <group>
          <mesh position={[0, 0.42, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.3, 0.7, 6]} />
            <meshStandardMaterial color={body} metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.82, 0]} castShadow>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
          </mesh>
        </group>
      )
    default:
      return null
  }
}

export function PokemonPiece({ fenChar, selected }: Props) {
  const meta = metaForFenPiece(fenChar)
  const fenRole = fenChar.toLowerCase()
  const roleMap: Record<string, PokemonRole> = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
  }
  const role = roleMap[fenRole] ?? 'pawn'

  return (
    <group>
      {selected && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.42, 32]} />
          <meshBasicMaterial color="#ffd166" transparent opacity={0.9} />
        </mesh>
      )}
      <RoleShape role={role} accent={meta.accent} body={meta.body} />
      <Text
        position={[0, 1.05, 0]}
        fontSize={0.14}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {meta.name}
      </Text>
    </group>
  )
}
