package session

import "sync"

// Possible session states.
const (
	StateIdle      = "IDLE"      
	StateWaiting   = "WAITING"  
	StateSending   = "SENDING"  
	StateReceiving = "RECEIVING" 
)

type Session struct {
	mu          sync.RWMutex
	state       string
	subscribers map[chan string]struct{}
}

func New() *Session {
	return &Session{
		state:       StateIdle,
		subscribers: make(map[chan string]struct{}),
	}
}

func (s *Session) GetState() string {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.state
}

func (s *Session) SetState(state string) {
	s.mu.Lock()
	s.state = state

	subs := make([]chan string, 0, len(s.subscribers))
	for ch := range s.subscribers {
		subs = append(subs, ch)
	}
	s.mu.Unlock()

	for _, ch := range subs {
		select {
		case ch <- state:
		default:

		}
	}
}

func (s *Session) Subscribe() chan string {
	ch := make(chan string, 4)
	s.mu.Lock()
	s.subscribers[ch] = struct{}{}
	s.mu.Unlock()
	return ch
}

func (s *Session) Unsubscribe(ch chan string) {
	s.mu.Lock()
	delete(s.subscribers, ch)
	s.mu.Unlock()
	close(ch)
}
