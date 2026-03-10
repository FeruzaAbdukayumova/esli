import { useEffect, useRef, useCallback } from 'react'
import { storage } from '@/shared/lib/storage'
import type { ChatMessage } from './types'

export function useChatWebSocket(
  conversationId: string | null,
  guestId: string | null,
  onMessage: (msg: ChatMessage) => void,
) {
  const wsRef = useRef<WebSocket | null>(null)
  const onMessageRef = useRef(onMessage)
  onMessageRef.current = onMessage

  const connect = useCallback(() => {
    if (!conversationId) return

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const host = window.location.host
    const params = new URLSearchParams()

    const token = storage.getToken()
    if (token) params.set('token', token)
    if (guestId) params.set('guest_id', guestId)

    const ws = new WebSocket(`${protocol}//${host}/api/v1/chat/ws/${conversationId}?${params.toString()}`)

    ws.onmessage = (event) => {
      try {
        const msg: ChatMessage = JSON.parse(event.data)
        onMessageRef.current(msg)
      } catch {
        // ignore malformed messages
      }
    }

    let reconnectTimer: ReturnType<typeof setTimeout>
    ws.onclose = () => {
      reconnectTimer = setTimeout(connect, 3000)
    }

    wsRef.current = ws

    return () => {
      clearTimeout(reconnectTimer)
    }
  }, [conversationId, guestId])

  useEffect(() => {
    const cleanup = connect()
    return () => {
      cleanup?.()
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [connect])

  return wsRef
}
