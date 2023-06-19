export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			profile: {
				Row: {
					created_at: string;
					email: string;
					id: string;
					name: string;
					photo: string | null;
				};
				Insert: {
					created_at?: string;
					email: string;
					id?: string;
					name: string;
					photo?: string | null;
				};
				Update: {
					created_at?: string;
					email?: string;
					id?: string;
					name?: string;
					photo?: string | null;
				};
				Relationships: [];
			};
			team: {
				Row: {
					captain: string;
					created_at: string | null;
					id: string;
					name: string;
				};
				Insert: {
					captain: string;
					created_at?: string | null;
					id?: string;
					name: string;
				};
				Update: {
					captain?: string;
					created_at?: string | null;
					id?: string;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'team_captain_fkey';
						columns: ['captain'];
						referencedRelation: 'profile';
						referencedColumns: ['id'];
					}
				];
			};
			team_member: {
				Row: {
					created_at: string | null;
					id: string;
					member_id: string;
					team_id: string;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					member_id: string;
					team_id: string;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					member_id?: string;
					team_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'team_member_member_id_fkey';
						columns: ['member_id'];
						referencedRelation: 'profile';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'team_member_team_id_fkey';
						columns: ['team_id'];
						referencedRelation: 'team';
						referencedColumns: ['id'];
					}
				];
			};
			todo: {
				Row: {
					completed: boolean;
					created_at: string;
					creator: string;
					description: string | null;
					due_by: string | null;
					id: string;
					team_id: string;
					title: string;
				};
				Insert: {
					completed?: boolean;
					created_at?: string;
					creator: string;
					description?: string | null;
					due_by?: string | null;
					id?: string;
					team_id: string;
					title: string;
				};
				Update: {
					completed?: boolean;
					created_at?: string;
					creator?: string;
					description?: string | null;
					due_by?: string | null;
					id?: string;
					team_id?: string;
					title?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'todo_creator_fkey';
						columns: ['creator'];
						referencedRelation: 'profile';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'todo_team_id_fkey';
						columns: ['team_id'];
						referencedRelation: 'team';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
