/**
 * Physically based materials (meshPhysicalMaterial): stone, metal, leather, glass, etc.
 * Uses procedural roughness/bump maps so surfaces look worn without image files.
 * mat() is the default entry point for creature meshes (usually "organic" kind).
 */
import { leatherBumpMap, metalRoughnessMap, organicBumpMap, stoneRoughnessMap } from './proceduralTextures'

export type PbrOpts = {
  emissive?: string
  intensity?: number
  metalness?: number
  roughness?: number
  transparent?: boolean
  opacity?: number
  clearcoat?: number
  clearcoatRoughness?: number
  sheen?: number
  sheenRoughness?: number
  sheenColor?: string
  transmission?: number
  thickness?: number
  ior?: number
  bumpScale?: number
  envMapIntensity?: number
}

export function pbr(
  color: string,
  kind: 'stone' | 'metal' | 'leather' | 'organic' | 'glass' | 'ember' | 'flat',
  opts?: PbrOpts,
) {
  const roughnessMap =
    kind === 'stone'
      ? stoneRoughnessMap()
      : kind === 'metal'
        ? metalRoughnessMap()
        : kind === 'leather' || kind === 'organic'
          ? undefined
          : undefined

  const bumpMap = kind === 'leather' ? leatherBumpMap() : kind === 'organic' ? organicBumpMap() : undefined

  const baseRough =
    kind === 'metal' ? 0.32 : kind === 'stone' ? 0.88 : kind === 'leather' ? 0.72 : kind === 'glass' ? 0.08 : 0.55

  const baseMetal = kind === 'metal' ? 0.92 : kind === 'ember' ? 0.15 : kind === 'flat' ? 0.04 : 0.06

  return (
    <meshPhysicalMaterial
      color={color}
      roughness={opts?.roughness ?? baseRough}
      metalness={opts?.metalness ?? baseMetal}
      roughnessMap={roughnessMap}
      bumpMap={bumpMap}
      bumpScale={opts?.bumpScale ?? (bumpMap ? 0.035 : 0)}
      emissive={opts?.emissive ?? '#000000'}
      emissiveIntensity={opts?.intensity ?? 0}
      transparent={opts?.transparent}
      opacity={opts?.opacity ?? 1}
      clearcoat={opts?.clearcoat ?? (kind === 'metal' ? 0.35 : kind === 'organic' ? 0.55 : 0)}
      clearcoatRoughness={opts?.clearcoatRoughness ?? 0.35}
      sheen={opts?.sheen ?? (kind === 'leather' ? 0.8 : 0)}
      sheenRoughness={opts?.sheenRoughness ?? 0.6}
      sheenColor={opts?.sheenColor ?? color}
      transmission={opts?.transmission ?? (kind === 'glass' ? 0.65 : 0)}
      thickness={opts?.thickness ?? (kind === 'glass' ? 0.4 : 0)}
      ior={opts?.ior ?? 1.45}
      envMapIntensity={opts?.envMapIntensity ?? 1.1}
    />
  )
}

/** Back-compat wrapper — defaults to organic PBR for creature surfaces. */
export function mat(
  color: string,
  opts?: PbrOpts & { kind?: 'stone' | 'metal' | 'leather' | 'organic' | 'glass' | 'ember' | 'flat' },
) {
  let kind = opts?.kind
  if (!kind) {
    if (opts?.metalness !== undefined && opts.metalness >= 0.5) kind = 'metal'
    else if (opts?.transmission) kind = 'glass'
    else kind = 'organic'
  }
  const { kind: _k, ...rest } = opts ?? {}
  return pbr(color, kind, rest)
}

export function ghostSheet(body: string, accent: string, opacity = 0.78) {
  return (
    <meshPhysicalMaterial
      color={body}
      transparent
      opacity={opacity}
      roughness={0.18}
      metalness={0}
      transmission={0.55}
      thickness={0.65}
      ior={1.35}
      emissive={accent}
      emissiveIntensity={0.22}
      envMapIntensity={0.8}
    />
  )
}

export function emberFlame(color = '#ff6d00') {
  return (
    <meshPhysicalMaterial
      color={color}
      emissive={color}
      emissiveIntensity={1.4}
      roughness={0.35}
      transparent
      opacity={0.92}
      toneMapped
    />
  )
}

export function stainedGlass(color: string, emissiveIntensity = 0.85) {
  return (
    <meshPhysicalMaterial
      color={color}
      emissive={color}
      emissiveIntensity={emissiveIntensity}
      roughness={0.15}
      metalness={0}
      transmission={0.25}
      thickness={0.2}
      envMapIntensity={0.6}
    />
  )
}

export const ACES_EXPOSURE = 1.05
